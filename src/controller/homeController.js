import userService from "../service/userService";
const handleHome = (req, res) => {
  const a = "ẻ";
  return res.render("home.ejs", { result: a });
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

const handleCreateNewUser = async (req, res) => {
  const email = req.body.emailName;
  const userName = req.body.UserName;
  const password = req.body.passwordName;

  userService.createNewUser(email, password, userName);

  return res.send("ok");
};

// const handleGetUserList = async () => {
//   let result = await userService.getUserList();
//   return res.render("user.ejs", { datauser: result });
// };

module.exports = {
  handleHome,
  handleUserPage,
  handleCreateNewUser,
  // handleGetUserList,
};
