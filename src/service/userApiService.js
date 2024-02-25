import db from "../models/index";

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

const createNewUser = async () => {
  try {
    await db.User.create({});
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      //update
    } else {
      //not found
    }
  } catch (e) {
    console.log(e);
  }
};
const deleteUser = async (data) => {
  try {
    await db.User.delete({
      where: { id: data.id },
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
