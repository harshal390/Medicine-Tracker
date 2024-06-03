const jwt = require("jsonwebtoken");
const config = require("../config/env");
const { generalResponse } = require("../helpers/response.helper");
const User = require('../models/index').sequelize.models.User;
const Session = require('../models/index').sequelize.models.Session;

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.tokenjwt;
        const verifyUser = jwt.verify(token, config.jwt_secret_key);
        const userId = verifyUser._id;
        const user = await User.findByPk(userId);
        const session = await Session.findOne({ where: { sessionToken: token, userId: userId, isDeleted: 0 } });
        if (!session) {
            throw new Error('Invalid Token');
        }
        if (!user) {
            throw new Error('User not found');
        }
        //Let's attach user data to the req
        req.user = user;
        next();
    } catch (error) {
        generalResponse(res, error.toString(), "Error Occured at auth middleware", "error", 1, 200);
    }
}

module.exports = { auth };
