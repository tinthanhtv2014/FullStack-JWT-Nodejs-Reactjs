import db from "../models/index";
const createNewRoles = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });

    const persists = roles.filter(
      ({ url: url }) => !currentRoles.some(({ url: url2 }) => url === url2)
    );
    if (persists.length === 0) {
      return {
        EM: "nothing to create...",
        EC: 0,
        DT: [],
      };
    }
    await db.Role.bulkCreate(roles);
    return {
      EM: `create role successfully....${persists.length}`,
      EC: 0,
      DT: [],
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  createNewRoles,
};
