const Status = require("../models/statusModel")

const getStatus = async (req, res) => {
    const user_id = req.user._id;
    const status = await Status.findOne({ user_id });
    res.status(200).json(status);
};
module.exports = {getStatus};
