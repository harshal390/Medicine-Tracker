const getIpFromRequest = (req) => {
    let ips = (
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress || ''
    ).split(',');

    return ips[0].trim();
};

const kindsOfMedications = [
    {
        id: 1,
        img: "/images/pngs/pill01_v1_w 1.png",
        name: "Pill",
    },
    {
        id: 2,
        img: "/images/pngs/caps7_9dsddssd 1.png",
        name: "Capsule",
    },
    {
        id: 3,
        img: "/images/pngs/ing 2.png",
        name: "Injection",
    },
    {
        id: 4,
        img: "/images/pngs/amp02 2.png",
        name: "Amp",
    },
]

module.exports = { getIpFromRequest };

