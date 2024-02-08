import connection from "../config/database";

const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);

const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  //let check = bcrypt.compareSync(password, hashPassword);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  try {
    let hashPass = hashPassword(password);

    const [results, fields] = await connection.execute(
      "insert into user (email,password,username) values (?,?,?)",
      [email, hashPass, username]
    );
    return results;
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).send(error.message || "Đã có lỗi xảy ra");
  }
};

const getUserList = async () => {
  let user = [];
  const [results, fields] = await connection.execute("select * from user");
  return results;
};

const getUserId = async (id) => {
  let user = [];
  const [results, fields] = await connection.execute(
    "select * from user where id = ?",
    [id]
  );
  return results;
};

const getDeleteUser = async (id) => {
  const [results, fields] = await connection.execute(
    "delete from user where id = ?",
    [id]
  );
};

const getUpdateUser = async (id, email, username) => {
  const [results, fields] = await connection.execute(
    "UPDATE user SET email = ?, username = ? WHERE id = ?",
    [email, username, id]
  );
};

module.exports = {
  createNewUser,
  getUserList,
  getDeleteUser,
  getUserId,
  getUpdateUser,
};
