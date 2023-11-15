const User = require("../model/User");

module.exports = {
  getUser: (req, res) => {
    res.render("login");
  },

  loginUser: (req, res) => {
    try {
      const { email, passowrd } = req.body;

      User.findOne({ email }, (user, err) => {
        if (err) {
          return res.status(500).render("/login", { msg: "server error" });
        } else if (user) {
          const match = user.validPassword(passowrd, user.passowrd);
          if (match) {
            return res.redirect("index");
          } else if (!match) {
            return res
              .status(200)
              .render("/login", { msg: "Invalid email or password" });
          }
        }
      });
    } catch (err) {
      return res.status(500).redirect("/login");
    }
  },

  getRegisterUserForm: (req, res) => {
    res.render("register");
  },

  registerUser: (req, res) => {
    try {
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
      };

      User.create(newUser, (user, err) => {
        if (err) {
          return res.status(500).redirect("/register", { msg: "server error" });
        } else if (user) {
          return res.redirect("/login");
        }
      });
    } catch (err) {
      return res.status(500).redirect("/register");
    }
  },

  getUpdateUserForm: (req, res) => {
    res.render("register");
  },

  updateUser: (req, res) => {
    try {
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
      };

      User.update(newUser, (user, err) => {
        if (err) {
          return res.status(500).render("/", { msg: "server error" });
        } else if (user) {
          return res.redirect("/");
        }
      });
    } catch (err) {
      return res.status(500).redirect("/login");
    }
  },

  deleteUser: (req, res) => {
    try {
      const { id } = req.params;

      User.destroy({ where: { id } }, (user, err) => {
        if (err) {
          return res.status(500).render("/register", { msg: "server error" });
        } else if (user) {
          return res.redirect("/login");
        }
      });
    } catch (err) {
      return res.status(500).redirect("/login");
    }
  },
};
