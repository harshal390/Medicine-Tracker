const getIpFromRequest = (req) => {
    let ips = (
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress || ''
    ).split(',');

    return ips[0].trim();
};

const DateTimeToDate = (dateTime) => dateTime.split("T")[0];
const DateTimeToTime = (dateTime) => dateTime.split("T")[1].concat(":00");
const mySqlDatetoNorDate = (dateTime) => {
    const date = dateTime.split("T")[0];
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const month = parseInt(date.split("T")[0].split("-")[1]);
    return `${date.split("T")[0].split("-")[2]} ${monthNames[month - 1]} ${date.split("T")[0].split("-")[0]}`;
};

const mySqlTimetoNorTime = (dateTime) => {
    const time = dateTime.split("T")[1].concat(":00");
    const hour = parseInt(time.slice(0, 3));
    return hour === 12 ? parseInt(time.slice(0, 3)).toString().concat(time.slice(2, 5)).concat(" pm") : hour === 24 ? (parseInt(time.slice(0, 3)) - 24).toString().concat(time.slice(2, 5)).concat(" am") : hour < 12 ? (parseInt(time.slice(0, 3))).toString().concat(time.slice(2, 5)).concat(" am") : (parseInt(time.slice(0, 3)) - 12).toString().concat(time.slice(2, 5)).concat(" pm");
}


module.exports = { getIpFromRequest, DateTimeToDate, DateTimeToTime, mySqlDatetoNorDate, mySqlTimetoNorTime };

