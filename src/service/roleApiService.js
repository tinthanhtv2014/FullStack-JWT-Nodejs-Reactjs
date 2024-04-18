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

const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll();
    return {
      EM: `get all roles succeeds`,
      EC: 0,
      DT: data,
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

const deleteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: { id: id },
    });
    if (role) {
      await role.destroy();
    }

    return {
      EM: `delete roles succeeds`,
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

const getRoleByGroup = async (id) => {
  try {
    if (!id) {
      return {
        EM: `not found any roles`,
        EC: 0,
        DT: [],
      };
    }
    let roles = await db.Group.findOne({
      where: { id: id },
      attributes: ["id", "name", "description"],
      include: {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    });

    return {
      EM: `get roles by group succeeds`,
      EC: 0,
      DT: roles,
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
  getAllRoles,
  deleteRole,
  getRoleByGroup,
};
