import db from "../models";
import userApiService from "../service/userApiService";
const readFucn = async (req, res) => {
  try {
    let data = await userApiService.getAllUser();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: " ",
    });
  }
};

const createFucn = async (req, res) => {
  try {
    let data = await userApiService.createNewUser();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: " ",
    });
  }
};

const updateFucn = async (req, res) => {
  try {
    let data = await userApiService.updateUser();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: " ",
    });
  }
};

const deleteFucn = async (req, res) => {
  try {
    let data = await userApiService.deleteUser();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
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
  createFucn,
  updateFucn,
  deleteFucn,
};
