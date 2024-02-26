import db from "../models";
import groupService from "../service/groupService.js";
const readFucn = async (req, res) => {
  try {
    let data = await groupService.getGroup();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (err) {
    console.log(e);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: " ",
    });
  }
};

module.exports = {
  readFucn,
};
