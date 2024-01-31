import connection from "../configs/database";

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

  const [results, fields] = await connection.execute(
    "insert into users (email,password,username) values (?,?,?)",
    [email, password, userName]
  );
  console.log("check results", results);
  return res.send("ok");
};

module.exports = {
  handleHome,
  handleUserPage,
  handleCreateNewUser,
};
