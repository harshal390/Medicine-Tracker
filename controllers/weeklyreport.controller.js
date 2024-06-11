const User = require('../models/index').sequelize.models.User;
const Medication = require('../models/index').sequelize.models.Medication;
const Notification = require("../models/index").sequelize.models.Notification;
const sequelize = require('sequelize');
const { mySqlTimetoNorTime, mySqlDatetoNorDate } = require('../utils');
const { appendFileSync } = require('fs');
const sgMail = require('@sendgrid/mail');
const config = require('../config/env');
const fs = require("fs");

const groupByUsers = (array) =>
    array.reduce((all, curr) => {
        const key = curr.Medication.userId;
        (all[key] || (all[key] = [])).push(curr);
        return all;
    }, {});

const weeklyReports = async () => {
    try {
        const currentTime = new Date();
        const timeStamp = currentTime.getTime();
        const weekendTimestamp = 1 * 24 * 60 * 60 * 1000;
        const prevTimeStamp = timeStamp - weekendTimestamp;
        const prevTime = new Date(prevTimeStamp);

        let notifications = await Notification.findAll({
            where: {
                updatedAt: {
                    [sequelize.Op.between]: [prevTime, currentTime],
                }
            },
            raw: false,
            attributes: ["id", "medicationId", "markAsDone", "updatedAt"],
            include: [
                {
                    model: Medication,
                    attributes: ["id", "userId", "name", "purpose", "scheduleId", "kindOfMedicationId"],
                    include: [
                        {
                            model: User,
                            attributes: ["email"],
                        },
                    ]
                }
                ,

            ],
        });

        notifications = JSON.parse(JSON.stringify(notifications));
        const notificationsByUser = groupByUsers(notifications);
        // console.log(notificationsByUser);

        Object.keys(notificationsByUser).map(async (user) => {
            let userData = notificationsByUser[user];
            console.log(userData);
            let userDataArr = [];
            const kindOfMedicationsMap = {
                1: "pill",
                2: "capsule",
                3: "injection",
                4: "amp",
            };
            const kindOfSchedulesMap = {
                1: "One Time Only",
                2: "Daily",
                3: "Weekly"
            }
            userData.map(async (data) => {
                const obj = {
                    medicationName: data.Medication.name,
                    takenMedication: data.markAsDone ? "taken" : "pending",
                    medicationTime: data.markAsDone ? mySqlTimetoNorTime(data.updatedAt).concat(" ").concat(mySqlDatetoNorDate(data.updatedAt)) : "Pending Medication",
                    purpose: data.Medication.purpose,
                    schedule: kindOfSchedulesMap[data.Medication.scheduleId],
                    type: kindOfMedicationsMap[data.Medication.kindOfMedicationId],
                }
                userDataArr.push(obj);
            })
            // console.log(userDataArr);
            try {
                const header = `medicationName, takenMedication, medicationTime, purpose, schedule, type\n`
                appendFileSync(`${user}.${timeStamp}.csv`, header)
                userDataArr.map((data) => {
                    const { medicationName, takenMedication, medicationTime, purpose, schedule, type } = data;
                    const csv = `${medicationName},${takenMedication},${medicationTime},${purpose},${schedule},${type}\n`; // Construct a CSV row
                    appendFileSync(`${user}.${timeStamp}.csv`, csv);
                })

                // console.log(userData[0].Medication.User.email);

                const pathToAttachment = `${user}.${timeStamp}.csv`;
                const attachment = fs.readFileSync(pathToAttachment).toString("base64");
                const userEmail = userData[0].Medication.User.email
                const medicationTemplate = `Your Weekly Report is here`
                const message = {
                    to: userEmail,
                    from: config.sender_email,
                    subject: "Medication Reminder",
                    attachments: [
                        {
                            content: attachment,
                            filename: `${user}.${timeStamp}.csv`,
                            type: "text/csv",
                            disposition: "attachment"
                        }
                    ],
                    text: medicationTemplate,
                    html: `<strong>${medicationTemplate}</strong>
              `
                }
                await sgMail.send(message);
                console.log(userEmail,"Mail successful")
            } catch (error) {
                console.log(error);
            }
        })


    } catch (error) {
        console.log(error);
    }


}

module.exports = { weeklyReports };