const { generalResponse } = require("../helpers/response.helper");
const { DateTimeToDate, DateTimeToTime } = require("../utils");
const Medication = require("../models/index").sequelize.models.Medication;
const OneTimeOnlyMedication =
  require("../models/index").sequelize.models.OneTimeOnlyMedication;
const RecuringDaily = require("../models/index").sequelize.models.RecuringDaily;
const RecuringWeekly =
  require("../models/index").sequelize.models.RecuringWeekly;
const cron = require("node-cron");
const config = require("../config/env");
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
      generalResponse(
        res,
        createSchedule,
        "Medication Added successfully",
        "success",
        1,
        200
      );
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

const medicationList = async (req, res) => {
  try {
    const userId = req.user.id;
    const medications = await Medication.findAll({
      raw: false,
      where: { userId: userId },
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

    medications.map((medication) => {

      if (medication.scheduleId === 1) {
        try {

          const min = parseInt(medication.OneTimeOnlyMedication.time.split(":")[1]);
          const hr = parseInt(medication.OneTimeOnlyMedication.time.split(":")[0]);
          const date = parseInt(medication.OneTimeOnlyMedication.date.getDate());
          const month = parseInt(medication.OneTimeOnlyMedication.date.getMonth())+1;
          const cronTime = `${min} ${hr} ${date} ${month} * `;
          console.log(cronTime);
          // Schedule the cron job to run cronTime
          cron.schedule(cronTime, () => {
            console.log("Cron job executed at:", cronTime, new Date().toLocaleString());
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
          const startMonth = parseInt(medication.RecuringDaily.startDate.getMonth())+1;
          const endMonth = parseInt(medication.RecuringDaily.endDate.getMonth())+1;
          const cronTime = `${min} ${hr} ${startDate === endDate ? startDate : `${startDate}-${endDate}`} ${startMonth === endMonth ? startMonth : `${startMonth}-${endMonth}`} *`;
          console.log(cronTime);
          // Schedule the cron job to run cronTime
          cron.schedule(cronTime, () => {
            console.log("Cron job executed at:", cronTime, new Date().toLocaleString())+1;
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
          const startMonth = parseInt(medication.RecuringWeekly.startDate.getMonth()+1);
          const endMonth = parseInt(medication.RecuringWeekly.endDate.getMonth()+1);
          const day = parseInt(medication.RecuringWeekly.day);
          const cronTime = `${min} ${hr} ${startDate === endDate ? startDate : `${startDate}-${endDate}`} ${startMonth === endMonth ? startMonth : `${startMonth}-${endMonth}`} ${day}`;
          console.log(cronTime);
         // Schedule the cron job to run cronTime
         cron.schedule(cronTime, () => {
          console.log("Cron job executed at:", cronTime, new Date().toLocaleString());
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
