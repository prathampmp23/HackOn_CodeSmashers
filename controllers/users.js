const User = require("../models/user");

module.exports.rendersignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    // automatically logged in when user signUp
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to EcoQuest!");
      res.redirect("/EcoQuest#");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/EcoQuest/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to EcoQuest!");
  let redirectUrl = res.locals.redirectUrl || "/EcoQuest";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/EcoQuest");
  });
};
