const { generalResponse } = require("../helpers/response.helper");

const Notification = require("../models/index").sequelize.models.Notification;

const notificationController = async (req, res) => {
    try {
        const medicationId = req.params.id;
        console.log(medicationId);
        const notification = await Notification.findOne({ where: { medicationId: medicationId } });
        notification.set({ ...notification, markAsDone: 1 });
        notification.save();
        generalResponse(res, notification, null, "success", 200);

    } catch (error) {
        generalResponse(res, error.toString(), null, "error", 200);
    }
}

module.exports = { notificationController };