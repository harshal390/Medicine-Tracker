const { generalResponse } = require("../helpers/response.helper");
const sequelize = require('sequelize');
const { DateTimeToDate, DateTimeToTime } = require("../utils");
const Medication = require('../models/index').sequelize.models.Medication;
const OneTimeOnlyMedication = require('../models/index').sequelize.models.OneTimeOnlyMedication;
const RecuringDaily = require('../models/index').sequelize.models.RecuringDaily;
const RecuringWeekly = require('../models/index').sequelize.models.RecuringWeekly;

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
        const medication = await Medication.create({ ...MedicationData })
        const medicationId = medication.id;
        const ScheduleMap = {
            1: [
                OneTimeOnlyMedication,
                {
                    medicationId,
                    date: DateTimeToDate(req.body.oneTimeOnlyDateTime),
                    time: DateTimeToTime(req.body.oneTimeOnlyDateTime),

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
        // const createSchedule = await
        console.log(medication);
        generalResponse(res, medication, "add medication", "success", 1, 200);
    } catch (error) {
        generalResponse(res, error.toString(), "add medication", "error", 1, 400);
    }
}

module.exports = { addMedication };