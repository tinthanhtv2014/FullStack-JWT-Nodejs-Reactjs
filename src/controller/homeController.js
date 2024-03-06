import userService from "../service/userService";
const handleHome = (req, res) => {
  const a = "ẻ";
  return res.render("home.ejs", { result: a });
};

const handleUserPage = async (req, res) => {
  // Cookies that have not been signed
  console.log("Cookies: ", req.cookies);

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

const handleUpdateUser = async (req, res) => {
  const id = req.params.id;
  const result1 = await userService.getUserList();
  const result2 = await userService.getUserId(id);

  console.log("check result: ", result2);
  return res.render("userUpdate.ejs", { result1, result2 });
};

const handleUpdateUserWithId = async (req, res) => {
  const id = req.body.id;
  const email = req.body.emailName;
  const username = req.body.UserName;
  await userService.getUpdateUser(id, email, username);

  return res.redirect("/user");
};

module.exports = {
  handleHome,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  handleUpdateUser,
  handleUpdateUserWithId,
};
