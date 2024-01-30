const handleHome = (req, res) => {
  const a = "ẻ";
  return res.render("home.ejs", { result: a });
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

module.exports = {
  handleHome,
  handleUserPage,
};
