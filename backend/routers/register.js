const router = require("express").Router();
const User = require("../models/userSchema");
const validator = require("validator");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("register", {
    title: "Register"
  })
});

router.post("/", async (req, res) => {
  //check email
  if (!validator.isEmail(req.body.email)) {
    return res.json({error: "Not a valid email!"});
  }
  const emailExisted = await User.findOne({email: req.body.email});
  if (emailExisted) {
    return res.json({error: "Email already existed!"});
  }

  //hash password with bcrypt
  const hashedPassword = await bcrypt.hash(req.body.password, 4);
  
  //create new user in the database
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });

  newUser = await newUser.save()
  .then((response) => {
    return res.status(200).redirect("/login");
  })
  .catch((err) => {
    console.log(err);
    return res.json({error: "Failed to register user!"});
  });
})

module.exports = router;