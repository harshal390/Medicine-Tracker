const { generalResponse } = require("../helpers/response.helper");
const { DateTimeToDate, DateTimeToTime } = require("../utils");
const Medication = require('../models/index').sequelize.models.Medication;
const OneTimeOnlyMedication = require('../models/index').sequelize.models.OneTimeOnlyMedication;
const RecuringDaily = require('../models/index').sequelize.models.RecuringDaily;
const RecuringWeekly = require('../models/index').sequelize.models.RecuringWeekly;
const Transaction = require("../models/index").sequelize.transaction;

const addMedication = async (req, res) => {
    try {
        const userId = req.user.id;
        const schedule = parseInt(req.body.schedules);
        const kindOfMedicationsMap = {
            pill: 1,
            capsule: 2,
            injection: 3,
            amp: 4
        }
        const MedicationData = {
            name: req.body.name,
            purpose: req.body.purpose,
            userId: userId,
            scheduleId: schedule,
            kindOfMedicationId: kindOfMedicationsMap[req.body.medicationType]
        }


        await require("../models/index").sequelize.transaction(async (t) => {
            const medication = await Medication.create({ ...MedicationData }, { transaction: t })
            const medicationId = medication.id;
            const ScheduleMap = {
                1: [
                    OneTimeOnlyMedication,
                    {
                        medicationId,
                        date: req.body.oneTimeOnlyDateTime ? DateTimeToDate(req.body.oneTimeOnlyDateTime) : null,
                        time: req.body.oneTimeOnlyDateTime ? DateTimeToTime(req.body.oneTimeOnlyDateTime) : null,

                    }
                ],
                2: [
                    RecuringDaily,
                    {
                        medicationId,
                        time: req.body.recuringDailytime,
                        startDate: req.body.recuringDailyStartDate,
                        endDate: req.body.recuringDailyEndDate
                    }
                ],
                3: [
                    RecuringWeekly,
                    {
                        medicationId,
                        day: parseInt(req.body.recuringWeeklySchedules),
                        time: req.body.recuringWeeklyTime,
                        startDate: req.body.recuringWeeklyStartDate,
                        endDate: req.body.recuringWeeklyEndDate,
                    }
                ],
            }
            // console.log(ScheduleMap[schedule][0], { ...ScheduleMap[schedule][1] });
            const createSchedule = await ScheduleMap[schedule][0].create({ ...ScheduleMap[schedule][1] }, { transaction: t })
            generalResponse(res, createSchedule, "Medication Added successfully", "success", 1, 200);
        })
    } catch (error) {
        console.log(error);
        generalResponse(res, error.toString(), "Error occured while adding medication", "error", 1, 200);
    }
}

module.exports = { addMedication };