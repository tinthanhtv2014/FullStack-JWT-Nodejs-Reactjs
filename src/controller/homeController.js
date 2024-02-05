import userService from "../service/userService";
const handleHome = (req, res) => {
  const a = "ẻ";
  return res.render("home.ejs", { result: a });
};

const handleUserPage = async (req, res) => {
  let userlist = await userService.getUserList();

  return res.render("user.ejs", { dataproduct: userlist });
};

const handleCreateNewUser = async (req, res) => {
  const email = req.body.emailName;
  const userName = req.body.UserName;
  const password = req.body.passwordName;

  userService.createNewUser(email, password, userName);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  const id = req.params.id;
  await userService.getDeleteUser(id);
  return res.redirect("/user");
};

module.exports = {
  handleHome,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
};
