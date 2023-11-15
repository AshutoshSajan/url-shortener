const User = require("../model/User");

function fullUrl(req) {
  return {
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl,
  };
}

module.exports = {
  getAllUsers: (req, res) => {
    try {
      User.findAll({ where: {} }, (users, err) => {
        if (err) {
          return res.status(500).redirect("/login");
        } else if (users) {
          return res.status(200).json({ success: true, users });
        }
      });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, err: err.message, msg: "server error" });
    }
  },

  getUser: (req, res) => {
    res.render("login");
  },

  loginUser: (req, res) => {
    try {
      console.log({
        fullUrl: req.protocol + "://" + req.get("host") + req.originalUrl,
      });

      const { email, passowrd } = req.body;

      User.findOne({ where: { email } }, (user, err) => {
        if (err) {
          return res
            .status(500)
            .redirect("/login", { err: err.message, msg: "server error" });
        } else if (user) {
          const match = user.validPassword(passowrd, user.passowrd);
          if (match) {
            return res.render("home");
          } else if (!match) {
            return res
              .status(200)
              .redirect("/login", { msg: "Invalid email or password" });
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
        console.log({ user, err });
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
          return res.status(500).redirect("/", { msg: "server error" });
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
          return res.status(500).redirect("/register", { msg: "server error" });
        } else if (user) {
          return res.redirect("/login");
        }
      });
    } catch (err) {
      return res.status(500).redirect("/login");
    }
  },
};
