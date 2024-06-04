const getIpFromRequest = (req) => {
    let ips = (
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress || ''
    ).split(',');

    return ips[0].trim();
};

const DateTimeToDate = (dateTime)=>dateTime.split("T")[0];
const DateTimeToTime = (dateTime)=>dateTime.split("T")[1].concat(":00");


module.exports = { getIpFromRequest,DateTimeToDate,DateTimeToTime };

