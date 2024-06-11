const sequelize = require('sequelize');
const { generalResponse } = require("../helpers/response.helper");
const { DateTimeToDate, DateTimeToTime } = require("../utils");
const Medication = require("../models/index").sequelize.models.Medication;
const OneTimeOnlyMedication =
  require("../models/index").sequelize.models.OneTimeOnlyMedication;
const RecuringDaily = require("../models/index").sequelize.models.RecuringDaily;
const RecuringWeekly =
  require("../models/index").sequelize.models.RecuringWeekly;
const Notification = require("../models/index").sequelize.models.Notification;
const cron = require("node-cron");
const config = require("../config/env");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.twilio_sendgrid_api);

const addMedication = async (req, res) => {
  try {
    const userId = req.user.id;
    const schedule = parseInt(req.body.schedules);
    const kindOfMedicationsMap = {
      pill: 1,
      capsule: 2,
      injection: 3,
      amp: 4,
    };
    const MedicationData = {
      name: req.body.name,
      purpose: req.body.purpose,
      userId: userId,
      scheduleId: schedule,
      kindOfMedicationId: kindOfMedicationsMap[req.body.medicationType],
    };

    await require("../models/index").sequelize.transaction(async (t) => {
      try {
        const medication = await Medication.create(
          { ...MedicationData },
          { transaction: t }
        );
        const medicationId = medication.id;
        const ScheduleMap = {
          1: [
            OneTimeOnlyMedication,
            {
              medicationId,
              date: req.body.oneTimeOnlyDateTime
                ? DateTimeToDate(req.body.oneTimeOnlyDateTime)
                : null,
              time: req.body.oneTimeOnlyDateTime
                ? DateTimeToTime(req.body.oneTimeOnlyDateTime)
                : null,
            },
          ],
          2: [
            RecuringDaily,
            {
              medicationId,
              time: req.body.recuringDailytime,
              startDate: req.body.recuringDailyStartDate,
              endDate: req.body.recuringDailyEndDate,
            },
          ],
          3: [
            RecuringWeekly,
            {
              medicationId,
              day: parseInt(req.body.recuringWeeklySchedules),
              time: req.body.recuringWeeklyTime,
              startDate: req.body.recuringWeeklyStartDate,
              endDate: req.body.recuringWeeklyEndDate,
            },
          ],
        };
        // console.log(ScheduleMap[schedule][0], { ...ScheduleMap[schedule][1] });
        const createSchedule = await ScheduleMap[schedule][0].create(
          { ...ScheduleMap[schedule][1] },
          { transaction: t }
        );

        const NotificationData = {
          medicationId,
          markAsDone: 0
        }
        const notification = await Notification.create({ ...NotificationData }, { transaction: t });
        generalResponse(
          res,
          createSchedule,
          "Medication Added successfully",
          "success",
          1,
          200
        );
      } catch (error) {
        console.log("rollback", error.toString());
      }
    });
  } catch (error) {
    console.log(error);
    generalResponse(
      res,
      error.toString(),
      "Error occured while adding medication",
      "error",
      1,
      200
    );
  }
};

const deleteMedicationAutomatic = async (deleteTime, medication) => {
  const currentTime = new Date();
  let offset = currentTime.getTimezoneOffset(); //-330
  offset = parseFloat(offset / 60) * (-1 * 60 * 60 * 1000); //+5.5
  const currentTimestamp = Date.now(new Date()) + offset;
  const endTimestamp = deleteTime.getTime();
  console.log(currentTime.toString(), currentTimestamp, deleteTime, endTimestamp);
  console.log(currentTimestamp >= endTimestamp);
  if (currentTimestamp >= endTimestamp) {
    let medicationDelete = await Medication.findOne({ where: { id: medication.id } });
    medicationDelete.set({ ...medication, isDeleted: 1, deletedAt: new Date() });
    medicationDelete.save();
    console.log(JSON.parse(JSON.stringify(medicationDelete)));
    return true;
  }
  return false;
}

const medicationList = async (req, res) => {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;
    const medications = await Medication.findAll({
      raw: false,
      where: {
        userId: userId, isDeleted: {
          [sequelize.Op.not]: 1
        }
      },
      attributes: ["id", "name", "purpose", "scheduleId", "kindOfMedicationId"],
      include: [
        {
          model: OneTimeOnlyMedication,
          attributes: ["date", "time"],
        },
        {
          model: RecuringDaily,
          attributes: ["time", "startDate", "endDate"],
        },
        {
          model: RecuringWeekly,
          attributes: ["day", "time", "startDate", "endDate"],
        },
      ],
    });
    // console.log(JSON.parse(JSON.stringify(medications)));

    medications.map(async (medication) => {

      if (medication.scheduleId === 1) {
        try {

          const min = parseInt(medication.OneTimeOnlyMedication.time.split(":")[1]);
          const hr = parseInt(medication.OneTimeOnlyMedication.time.split(":")[0]);
          const date = parseInt(medication.OneTimeOnlyMedication.date.getDate());
          const month = parseInt(medication.OneTimeOnlyMedication.date.getMonth()) + 1;
          const cronTime = `${min} ${hr} ${date} ${month} * `;
          // console.log(cronTime);

          // Schedule the cron job to run cronTime
          cron.schedule(cronTime, async () => {
            console.log("Cron job executed at:", cronTime, new Date().toLocaleString(), JSON.parse(JSON.stringify(medication)), userEmail, config.sender_email);
            const medicationTemplate = `You have to take this ${medication.name} medication now.`
            const message = {
              to: userEmail,
              from: config.sender_email,
              subject: "Medication Reminder",
              text: medicationTemplate,
              html: `<strong>${medicationTemplate}</strong>
              <a href='http://localhost:${config.port}/notification/${medication.id}'>Mark as Read</a> 
              `
            }
            //if we want to pass dynamic data using template
            // const message = {
            //   from: config.sender_email,
            //   to: userEmail,
            //   dynamic_template_date: {
            //     medicationName: medication.name,
            //   },
            //   template_id: config.twilio_sendgrid_template_id,
            // }
            try {
              await sgMail.send(message);
              console.log("mail successfully");
              const { date, time } = medication.OneTimeOnlyMedication;
              // date.toJSON method help to convert date object into date string
              const endTime = new Date(date.toJSON().replace("00:00:00", time));
              deleteMedicationAutomatic(endTime, medication);
            } catch (error) {
              if (error.response) {
                console.error(error.response.body)
              } else {
                console.log(error.toString());
              }
            }

          }, {
            scheduled: true,
            timezone: config.timezone,
          });


        } catch (error) {
          console.log(error);
        }
      } else if (medication.scheduleId === 2) {
        try {
          const min = parseInt(medication.RecuringDaily.time.split(":")[1]);
          const hr = parseInt(medication.RecuringDaily.time.split(":")[0]);
          const startDate = parseInt(medication.RecuringDaily.startDate.getDate());
          const endDate = parseInt(medication.RecuringDaily.endDate.getDate());
          const startMonth = parseInt(medication.RecuringDaily.startDate.getMonth()) + 1;
          const endMonth = parseInt(medication.RecuringDaily.endDate.getMonth()) + 1;
          const cronTime = `${min} ${hr} ${startDate === endDate ? startDate : `${startDate}-${endDate}`} ${startMonth === endMonth ? startMonth : `${startMonth}-${endMonth}`} *`;
          // console.log(cronTime);
          // Schedule the cron job to run cronTime
          cron.schedule(cronTime, async () => {
            console.log("Cron job executed at:", cronTime, new Date().toLocaleString(), JSON.parse(JSON.stringify(medication)));
            const medicationTemplate = `You have to take this ${medication.name} medication now.`
            const message = {
              to: userEmail,
              from: config.sender_email,
              subject: "Medication Reminder",
              text: medicationTemplate,
              html: `<strong>${medicationTemplate}</strong>
              <a href='http://localhost:${config.port}/notification/${medication.id}'>Mark as Read</a> 
              `
            }
            //if we want to pass dynamic data using template
            // const message = {
            //   from: config.sender_email,
            //   to: userEmail,
            //   dynamic_template_date: {
            //     medicationName: medication.name,
            //   },
            //   template_id: config.twilio_sendgrid_template_id,
            // }
            try {
              await sgMail.send(message);
              // console.log("mail successfully");
              const { endDate, time } = medication.RecuringDaily;
              const endTime = new Date(endDate.toJSON().replace("00:00:00", time));
              deleteMedicationAutomatic(endTime, medication);
            } catch (error) {
              if (error.response) {
                console.error(error.response.body)
              } else {
                console.log(error.toString());
              }
            }

          }, {
            scheduled: true,
            timezone: config.timezone,
          });

        } catch (error) {
          console.log(error);
        }
      }
      else if (medication.scheduleId === 3) {
        try {
          const min = parseInt(medication.RecuringWeekly.time.split(":")[1]);
          const hr = parseInt(medication.RecuringWeekly.time.split(":")[0]);
          const startDate = parseInt(medication.RecuringWeekly.startDate.getDate());
          const endDate = parseInt(medication.RecuringWeekly.endDate.getDate());
          const startMonth = parseInt(medication.RecuringWeekly.startDate.getMonth() + 1);
          const endMonth = parseInt(medication.RecuringWeekly.endDate.getMonth() + 1);
          const day = parseInt(medication.RecuringWeekly.day);
          const cronTime = `${min} ${hr} ${startDate === endDate ? startDate : `${startDate}-${endDate}`} ${startMonth === endMonth ? startMonth : `${startMonth}-${endMonth}`} ${day}`;
          // console.log(cronTime);
          // Schedule the cron job to run cronTime
          cron.schedule(cronTime, async () => {
            console.log("Cron job executed at:", cronTime, new Date().toLocaleString(), JSON.parse(JSON.stringify(medication)));
            const medicationTemplate = `You have to take this ${medication.name} medication now.`
            const message = {
              to: userEmail,
              from: config.sender_email,
              subject: "Medication Reminder",
              text: medicationTemplate,
              html: `<strong>${medicationTemplate}</strong>
              <a href='http://localhost:${config.port}/notification/${medication.id}'>Mark as Read</a> 
              `
            }
            //if we want to pass dynamic data using template
            // const message = {
            //   from: config.sender_email,
            //   to: userEmail,
            //   dynamic_template_date: {
            //     medicationName: medication.name,
            //   },
            //   template_id: config.twilio_sendgrid_template_id,
            // }
            try {
              await sgMail.send(message);
              // console.log("mail successfully")
              const { endDate, time } = medication.RecuringWeekly;
              const endTime = new Date(endDate.toJSON().replace("00:00:00", time));
              deleteMedicationAutomatic(endTime, medication);
            } catch (error) {
              if (error.response) {
                console.error(error.response.body)
              } else {
                console.log(error.toString());
              }
            }

          }, {
            scheduled: true,
            timezone: config.timezone,
          });
        } catch (error) {
          console.log(error);
        }
      }
      else {
        console.log("never happened");
      }
    });


    generalResponse(res, medications, "Medication List", "success", 1, 200);
  } catch (error) {
    generalResponse(
      res,
      error.toString(),
      "Error occured while display medication lists",
      "error",
      1,
      200
    );
  }
};

module.exports = { addMedication, medicationList };
