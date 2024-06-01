const config = require("../config/env");
const { generalResponse } = require("../helpers/response.helper");
const jwt = require("jsonwebtoken");
const User = require('../models/index').sequelize.models.User

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
        console.log('user was saved to the database!');
        generalResponse(res, user, "User Register Successfully", "success", 1, 200);
    } catch (error) {
        generalResponse(res, error.toString(), "User Register Failed", "error", 1, 200);
    }

};

const getLoginController = (req, res) => {
    // generalResponse(res, null, "get login", null, 1, 200);
    res.render("auth.ejs", { type: "login" });
};

const postLoginController = (req, res) => {
    generalResponse(res, req.body, "post login", null, 1, 200);
};

module.exports = { getRegisterController, postRegisterController, getLoginController, postLoginController };