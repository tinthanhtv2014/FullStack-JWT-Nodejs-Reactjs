import db from "../models/index";
import { checkEmail, checkPhone, hashPassword } from "./loginRegisterService";
const getAllUser = async () => {
  let data = {
    EM: "",
    EC: "",
    DT: "",
  };
  try {
    let users = await db.User.findAll({
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      nest: true,
      attributes: ["id", "username", "email", "phone", "sex"],
    });
    if (users) {
      //   let data = users.get({ plain: true });
      return {
        EM: "get successful",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "get data successfully",
        EC: 0,
        DT: [],
      };
    }
  } catch (err) {
    console.log(err);
    return {
      EM: "something went wrong",
      EC: 1,
      DT: [],
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
    });

    let totalPages = Math.ceil(count / limit);

    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    console.log(data);
    return {
      EM: "Ok ",
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

const createNewUser = async (data) => {
  try {
    let isEmailExist = await checkEmail(data.email);
    if (isEmailExist === true) {
      return {
        EM: "the email already exists",
        EC: 1,
        DT: [],
      };
    }

    let isPhoneExist = await checkPhone(data.phone);
    if (isPhoneExist === true) {
      return {
        EM: "the phone already exists",
        EC: 1,
        DT: "email",
      };
    }

    let hashPass = hashPassword(data.password);

    await db.User.create({ ...data, password: hashPass });
    return {
      EM: "create ok",
      EC: 0,
      DT: "phone",
    };
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (data) => {
  try {
    if (!data.groupId) {
      return {
        EM: "update error with empty groupId",
        EC: 1,
        DT: "group",
      };
    }
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      //update
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId,
      });
      return {
        EM: "update user success",
        EC: 0,
        DT: "",
      };
    } else {
      //not found
      return {
        EM: "user not found",
        EC: 2,
        DT: "",
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};
const deleteUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data },
    });
    if (user) {
      await user.destroy();
      return {
        EM: "delete user successfully ",
        EC: 0,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "User not exist ",
      EC: 2,
      DT: data,
    };
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
