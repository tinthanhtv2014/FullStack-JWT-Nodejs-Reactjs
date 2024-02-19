import db from "../models/index";

const bcrypt = require("bcrypt");
const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  //let check = bcrypt.compareSync(password, hashPassword);
  return hashPassword;
};
const checkEmail = async (email) => {
  let user = await db.User.findOne({
    where: { email: email },
  });

  if (user) {
    return true;
  } else {
    return false;
  }
};

const checkPhone = async (phone) => {
  let user = await db.User.findOne({
    where: { phone: phone },
  });

  if (user) {
    return true;
  } else {
    return false;
  }
};

const registerNewUser = async (userdata) => {
  try {
    let isEmailExist = await checkEmail(userdata.email);
    if (isEmailExist === true) {
      return {
        EM: "the email already exists",
        EC: 1,
      };
    }

    let isPhoneExist = await checkPhone(userdata.phone);
    if (isPhoneExist === true) {
      return {
        EM: "the phone already exists",
        EC: 1,
      };
    }

    let hashPass = hashPassword(userdata.password);

    await db.User.create({
      email: userdata.email,
      username: userdata.username,
      password: hashPass,
      phone: userdata.phone,
    });
    return {
      EM: "a user is created successfully",
      EC: 0,
    };
  } catch (e) {
    return {
      EM: "something went wrong",
      EC: -2,
    };
  }
};

module.exports = {
  registerNewUser,
};
