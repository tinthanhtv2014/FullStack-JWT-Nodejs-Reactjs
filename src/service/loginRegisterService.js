import db from "../models/index";
import { Op } from "sequelize";
import { getGroupWithRoles } from "./JWTService";
import { createJWT } from "../middleware/JWTAction";
require("dotenv").config();
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
      groupId: 4,
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

const checkPassword = (inputpassword, hashpass) => {
  return bcrypt.compareSync(inputpassword, hashpass);
};

const handleUserLogin = async (rawdata) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawdata.valueLogin }, { phone: rawdata.valueLogin }],
      },
    });
    if (user) {
      console.log(">>> found user wwith email or phone");
      let isCorrectPass = checkPassword(rawdata.password, user.password);
      if (isCorrectPass === true) {
        //let token

        //test roles
        let groupWithRoles = await getGroupWithRoles(user);
        let payload = {
          email: user.email,
          groupWithRoles,
          username: user.username,
          expiresIn: process.env.JWT_EXPIRES_IN,
        };
        let token = createJWT(payload);
        return {
          EM: "ok!",
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles,
            email: user.email,
            username: user.username,
          },
        };
      }
    }
    console.log(">>>user incorrect");
    return {
      EM: "the email or phone number incorrect,please try again",
      EC: 1,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something went wrong",
      EC: -2,
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
  hashPassword,
  checkEmail,
  checkPhone,
};
