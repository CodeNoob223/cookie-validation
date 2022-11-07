const router = require("express").Router();
const UserModel = require("../models/userSchema");
const validator = require("validator");
const bcrypt  = require("bcrypt");

router.get("/", (req, res) => {
  res.render("login", {
    title: "Login"
  })
});

router.post("/", async (req, res) => {
  const {email, password} = req.body;
  if (!validator.isEmail(email)) {
    return res.json({error: "Please input an valid email!"});
  }
  //check if user exist
  const user = await UserModel.findOne({email: email});
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      req.session.isAuth = true;
      req.session.user = user.username;
      return res.redirect("/dashboard");
    } else {
      return res.json({error: "Incorrect password!"});
    }
  }
  return res.json({error: "Email is not registered!"});
})

module.exports = router;