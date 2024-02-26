import db from "../models";

const getGroup = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["name", "ASC"]],
    });
    return {
      EM: "get Group successfully",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Somthing wrong with server response",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  getGroup,
};
