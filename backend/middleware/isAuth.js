const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    console.log(req.session);
    next(); //Run the next function
  } else {
    res.redirect("/login");
  }
}

module.exports = isAuth;