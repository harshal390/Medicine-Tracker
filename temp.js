// const { parse } = require("postcss");
// const { json } = require("sequelize");

// const datetime = '2024-06-12T12:25';
// // // console.log(datetime.split("T")[0]);
// // // console.log(datetime.split("T")[1].concat(":00"));
// let obj = {
//     medicationType: 'capsule',
//     name: 'pill',
//     purpose: 'opl',
//     schedules: '3',
//     oneTimeOnlyDateTime: '',
//     recuringDailytime: '',
//     recuringDailyStartDate: '',
//     recuringDailyEndDate: '',
//     recuringWeeklySchedules: '3',
//     recuringWeeklyTime: '10:25',
//     recuringWeeklyStartDate: '2024-06-12',
//     recuringWeeklyEndDate: '2024-06-06'
// }


let arr = [
    {
        "id": 1,
        "name": "name",
        "purpose": "purpose",
        "scheduleId": 3,
        "kindOfMedicationId": 1,
        "OneTimeOnlyMedication": null,
        "RecuringDaily": null,
        "RecuringWeekly": {
            "day": 1,
            "time": "12:25:00",
            "startDate": "2024-06-12T00:00:00.000Z",
            "endDate": "2024-06-12T00:00:00.000Z"
        }
    },
    {
        "id": 5,
        "name": "Medication Capsule",
        "purpose": "Because it's sweet",
        "scheduleId": 3,
        "kindOfMedicationId": 2,
        "OneTimeOnlyMedication": null,
        "RecuringDaily": null,
        "RecuringWeekly": {
            "day": 3,
            "time": "12:25:00",
            "startDate": "2024-06-12T00:00:00.000Z",
            "endDate": "2024-06-13T00:00:00.000Z"
        }
    },
    {
        "id": 6,
        "name": "Pill Medication",
        "purpose": "I Liked it",
        "scheduleId": 1,
        "kindOfMedicationId": 1,
        "OneTimeOnlyMedication": {
            "date": "2024-06-22T00:00:00.000Z",
            "time": "00:00:00"
        },
        "RecuringDaily": null,
        "RecuringWeekly": null
    },
    {
        "id": 7,
        "name": "Injection",
        "purpose": "Because I liked it",
        "scheduleId": 2,
        "kindOfMedicationId": 3,
        "OneTimeOnlyMedication": null,
        "RecuringDaily": {
            "time": "21:00:00",
            "startDate": "2024-06-06T00:00:00.000Z",
            "endDate": "2024-06-07T00:00:00.000Z"
        },
        "RecuringWeekly": null
    },
    {
        "id": 8,
        "name": "Gol gol",
        "purpose": "because it's circle",
        "scheduleId": 1,
        "kindOfMedicationId": 1,
        "OneTimeOnlyMedication": {
            "date": "2024-06-08T00:00:00.000Z",
            "time": "17:05:00"
        },
        "RecuringDaily": null,
        "RecuringWeekly": null
    },
    {
        "id": 9,
        "name": "Omeaga 3 ",
        "purpose": "Purpose",
        "scheduleId": 1,
        "kindOfMedicationId": 2,
        "OneTimeOnlyMedication": {
            "date": "2024-06-14T00:00:00.000Z",
            "time": "02:05:00"
        },
        "RecuringDaily": null,
        "RecuringWeekly": null
    },
    {
        "id": 10,
        "name": "Comlivit",
        "purpose": "Because it's very bitter in taste",
        "scheduleId": 2,
        "kindOfMedicationId": 1,
        "OneTimeOnlyMedication": null,
        "RecuringDaily": {
            "time": "22:00:00",
            "startDate": "2024-06-06T00:00:00.000Z",
            "endDate": "2024-06-12T00:00:00.000Z"
        },
        "RecuringWeekly": null
    },
    {
        "id": 11,
        "name": "5-HTP",
        "purpose": "It's in liquede",
        "scheduleId": 3,
        "kindOfMedicationId": 4,
        "OneTimeOnlyMedication": null,
        "RecuringDaily": null,
        "RecuringWeekly": {
            "day": 5,
            "time": "15:52:00",
            "startDate": "2024-06-13T00:00:00.000Z",
            "endDate": "2024-06-25T00:00:00.000Z"
        }
    }
]

// const date = "2024-05-06T00:00:00.000Z";
// const monthNames = ["January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"];
// // console.log(date.split("T")[0]);
// let month = parseInt(date.split("T")[0].split("-")[1]);
// // console.log(monthNames[month - 1])

// const time = "02:05:00"
// // console.log(time.slice(0, 5));

// const hour = parseInt(time.slice(0, 3));
// // console.log(hour);
// const mainTime = hour === 12 ? parseInt(time.slice(0, 3)).toString().concat(time.slice(2, 5)).concat(" pm") : hour === 24 ? (parseInt(time.slice(0, 3)) - 24).toString().concat(time.slice(2, 5)).concat(" am") : hour < 12 ? (parseInt(time.slice(0, 3))).toString().concat(time.slice(2, 5)).concat(" am") : (parseInt(time.slice(0, 3)) - 12).toString().concat(time.slice(2, 5)).concat(" pm");

// // console.log(mainTime);
const dateTimeAccordingToUtc = new Date();
console.log(dateTimeAccordingToUtc); // 2024-06-06T05:18:25.554Z (UTC timezone)

let offset = dateTimeAccordingToUtc.getTimezoneOffset(); //-330
offset = parseFloat(offset / 60) * (-1);
console.log(offset); //+5.5 means our timezone is ahead of 5.5 hour of utc timezone

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(timezone); //Asia/Calcutta

const options = {
    timeZone: timezone
}
const dateTimeAccordingToTimezone = dateTimeAccordingToUtc.toLocaleString([], options);
console.log(new Date(dateTimeAccordingToTimezone).toLocaleString(), dateTimeAccordingToTimezone) // 6/6/2024, 10:49:53 am (Our timezone)

// convert datetime to utc
console.log(dateTimeAccordingToUtc.toISOString()) // 2024-06-06T05:18:25.554Z (UTC timezone)

console.log(new Date());


const myCreatedDate = new Date(2024,5,6);
console.log(myCreatedDate.toDateString()); //Thu Jun 06 2024
console.log(myCreatedDate.toISOString()); //2024-06-05T18:30:00.000Z
console.log(myCreatedDate.toJSON()); //2024-06-05T18:30:00.000Z
console.log(myCreatedDate.toLocaleDateString()); //6/6/2024
console.log(myCreatedDate.toLocaleString()); //6/6/2024, 12:00:00 am
console.log(myCreatedDate.toLocaleTimeString()); //12:00:00 am
console.log(myCreatedDate.toString()); //Thu Jun 06 2024 00:00:00 GMT+0530 (India Standard Time)
console.log(myCreatedDate.toTimeString()); //00:00:00 GMT+0530 (India Standard Time)
console.log(myCreatedDate.toUTCString()); //Wed, 05 Jun 2024 18:30:00 GMT
console.log(myCreatedDate.getDate());
console.log(myCreatedDate.getMonth())
console.log(myCreatedDate.getDay());
console.log("Hello world")+1;

