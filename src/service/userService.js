import connection from "../config/database";

const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);
import db from "../models";
const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  //let check = bcrypt.compareSync(password, hashPassword);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  try {
    let hashPass = hashPassword(password);
    await db.User.create({
      username: username,
      email: email,
      password: hashPass,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).send(error.message || "Đã có lỗi xảy ra");
  }
};

const getUserList = async () => {
  //test relationships
  let newUser = await db.User.findOne({
    where: {
      id: 1,
    },
    raw: true,
    include: { model: db.Group, attributes: ["id", "name", "description"] },
    nest: true,
    attributes: ["id", "username", "email"],
  });

  let roles = await db.Role.findAll({
    include: {
      model: db.Group,
      where: {
        id: 1,
      },
    },
    nest: true,
    raw: true,
  });

  console.log("check 1 user: ", newUser);
  console.log("check 1 roles: ", roles);
  let users = [];
  users = await db.User.findAll();
  return users;
};

const getUserId = async (id) => {
  let user = {};
  // const [results, fields] = await connection.execute(
  //   "select * from user where id = ?",
  //   [id]
  // );
  user = await db.User.findOne({
    where: {
      id: id,
    },
  });
  return user.get({ plain: true });
};

const getDeleteUser = async (id) => {
  // const [results, fields] = await connection.execute(
  //   "delete from user where id = ?",
  //   [id]
  // );
  await db.User.destroy({
    where: {
      id: id,
    },
  });
};

const getUpdateUser = async (id, email, username) => {
  // const [results, fields] = await connection.execute(
  //   "UPDATE user SET email = ?, username = ? WHERE id = ?",
  //   [email, username, id]
  // );
  await db.User.update(
    { email: email, username: username },
    {
      where: {
        id: id,
      },
    }
  );
};

module.exports = {
  createNewUser,
  getUserList,
  getDeleteUser,
  getUserId,
  getUpdateUser,
};
