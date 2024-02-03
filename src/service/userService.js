import connection from "../configs/database";

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
      "insert into users (email,password,username) values (?,?,?)",
      [email, hashPass, username]
    );
    return results;
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).send(error.message || "Đã có lỗi xảy ra");
  }
};

const getUserList = async () => {
  let users = [];
  const [results, fields] = await connection.execute("select * from users");
  return results;
};

module.exports = {
  createNewUser,
  getUserList,
};
