const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/", (req, res, next) => {
  res.render("users/signup") 
});

router.post("/", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("users/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  else  {
  User.findOne({ "username": username })
  .then(user => {
    if (user !== null) {
        res.render("users/signup", {
          errorMessage: "The username already exists!"
        });
        return;
      }
      else {
        const salt     = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);


        User.create({
            username,
            password: hashPass
          })
          .then(() => {
            res.redirect("/recipes");
          })
          .catch(error => {
            console.log(error);
          })}
   })
  .catch(error => {
    next(error);
    })
  }
})

module.exports = router;