const config = require("../config/env");
const { generalResponse } = require("../helpers/response.helper");
const jwt = require("jsonwebtoken");
const User = require('../models/index').sequelize.models.User;
const bcrypt = require("bcryptjs");
const { where } = require("sequelize");
const Session = require('../models/index').sequelize.models.Session;

const createToken = (id) => {
    const { jwt_secret_key, jwt_expire } = { ...config };
    const token = jwt.sign({ _id: id }, jwt_secret_key, {
        expiresIn: jwt_expire,
    })
    return token;
}

const getRegisterController = (req, res) => {
    // generalResponse(res, null, "get register", null, 1, 200);
    res.render("auth.ejs", { type: "register" });
};

const postRegisterController = async (req, res) => {
    console.log({ ...req.body });
    try {
        const user = await User.create({ ...req.body })
        // console.log('user was saved to the database!');
        generalResponse(res, user, "User Register Successfully", "success", 1, 200);
    } catch (error) {
        generalResponse(res, error.toString(), "User Register Failed", "error", 1, 200);
    }

};

const getLoginController = (req, res) => {
    // generalResponse(res, null, "get login", null, 1, 200);
    res.render("auth.ejs", { type: "login" });
};

const postLoginController = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        // console.log(user);
        if (!user) {
            // console.log("Invalid Email");
            generalResponse(res, null, "Invalid Email", "error", 1, 200);
        } else {
            // console.log(user);
            const userPassword = user.password;
            // console.log(userPassword);
            const isMatch = await bcrypt.compare(req.body.password, userPassword);
            if (!isMatch) {
                generalResponse(res, user, "Invalid User Name or Password", "error", 1, 200);
            }
            else {
                const userId = user.id
                const token = createToken(userId);
                // console.log(token);
                const options = {
                    // expires: new Date(Date.now() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000) + config.cookie_expire * 60 * 60 * 1000),
                    expires: new Date(Date.now() + config.cookie_expire * 60 * 60 * 1000),
                    httpOnly: true,
                }
                await res.cookie("tokenjwt", token, options);
                await Session.create({ sessionToken: token, userId });
                generalResponse(res, user, "User Logged in Successfully", "success", 1, 200);
            }
        }
    } catch (error) {
        generalResponse(res, error.toString(), "User Login Failed", "error", 1, 200);
    }
};

const logoutFromCurrentDevice = async (req, res) => {
    try {
        const token = req.tokenjwt;
        const session = await Session.findOne({ sessionToken: token });
        session.set({ ...session, isDeleted: 1, deletedAt: new Date() });
        session.save();
        // console.log(session);
        res.clearCookie("tokenjwt");
        generalResponse(res, null, "User Logout Successfully", "success", 1, 200);
    } catch (error) {
        generalResponse(res, error.toString(), "User Logout Failed", "error", 1, 200);
    }
}

const logoutFromAllDevice = async () => {

}

// const logoutFromRemainingAllDevice = async () => {
//     //logout from all device except current device
// }

module.exports = { getRegisterController, postRegisterController, getLoginController, postLoginController, logoutFromCurrentDevice };