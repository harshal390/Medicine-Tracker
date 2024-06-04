const datetime = '2024-06-12T12:25';
console.log(datetime.split("T")[0]);
console.log(datetime.split("T")[1].concat(":00"));
let obj = {
    medicationType: 'capsule',
    name: 'pill',
    purpose: 'opl',
    schedules: '3',
    oneTimeOnlyDateTime: '',
    recuringDailytime: '',
    recuringDailyStartDate: '',
    recuringDailyEndDate: '',
    recuringWeeklySchedules: '3',
    recuringWeeklyTime: '10:25',
    recuringWeeklyStartDate: '2024-06-12',
    recuringWeeklyEndDate: '2024-06-06'
}

const ScheduleData = schedule === 1 ?
    {
        date: req.body.oneTimeOnlyDateTime,
        time: req.body.oneTimeOnlyDateTime
    } : schedule === 2 ?
        {
            time: req.body.recuringDailytime,
            startDate: req.body.recuringDailyStartDate,
            endDate: req.body.recuringDailyEndDate,
        } : {
            day: parseInt(req.body.recuringWeeklySchedules),
            time: req.body.recuringWeeklyTime,
            startDate: req.body.recuringWeeklyStartDate,
            endDate: req.body.recuringWeeklyEndDate,
        }