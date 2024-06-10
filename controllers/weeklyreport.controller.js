const User = require('../models/index').sequelize.models.User;
const Medication = require('../models/index').sequelize.models.Medication;
const Notification = require("../models/index").sequelize.models.Notification;
const sequelize = require('sequelize');
const path = require("path");
const csvWriter = require("csv-writer");

const groupByUsers = (array) =>
    array.reduce((all, curr) => {
        const key = curr.Medication.userId;
        (all[key] || (all[key] = [])).push(curr);
        return all;
    }, {});

const weeklyReports = async () => {
    const currentTime = new Date();
    const timeStamp = currentTime.getTime();
    // console.log(timeStamp);
    const weekendTimestamp = 1 * 24 * 60 * 60 * 1000;
    const prevTimeStamp = timeStamp - weekendTimestamp;
    // console.log(prevTimeStamp);
    const prevTime = new Date(prevTimeStamp);
    // console.log(prevTime);//2024-06-04T09:49:19.468Z
    console.log(prevTime, currentTime);

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
                        attributes: ["username"],
                    },
                ]
            }
            ,

        ],
    });

    notifications = JSON.parse(JSON.stringify(notifications));
    const notificationsByUser = JSON.stringify(groupByUsers(notifications))
    console.log(notificationsByUser);
    Object.keys(notificationsByUser).map(user => {
        const writer = csvWriter.createObjectCsvWriter({
            path: path.resolve(__dirname, `${user}.csv`),
            header: [
                { id: "name", title: "Name" },
                { id: "countryCode", title: "Country Code" },
                { id: "capital", title: "Capital" },
                { id: "phoneIndicator", title: "International Direct Dialling" },
            ],
        });
    })


}

module.exports = { weeklyReports };