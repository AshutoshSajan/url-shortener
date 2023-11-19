const User = require('../model/User');
const { validPassword } = require('../utils/helpers');

module.exports = {
  getUserByEmail: (req, res) => {
    User.findOne({ email: req.body.email }).then((user, err) => {
      if (user) {
        res.status(200).json(user);
      } else if (err) {
        res.json({ err, msg: 'server error' });
      }
    });
  },

  getUser: (req, res) => {},

  getLoginForm: (req, res) => {
    return res.render('login');
  },

  getRegisterUserForm: (req, res) => {
    return res.render('register');
  },

  loginUser: (req, res) => {
    const { email, password } = req.body;

    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          const match = validPassword(password, user.password);
          if (match) {
            return res.render('home');
          } else if (!match) {
            return res.render('login', { msg: 'Invalid email or password' });
          }
        }

        return res.render('login', {
          msg: 'user not found',
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).render('login', { msg: 'user not found' });
      });
  },

  registerUser: (req, res) => {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    };

    User.create(user)
      .then(() => {
        return res.redirect('/api/v1/users/login');
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).render('register', { msg: err.message });
      });
  },

  getUpdateUserForm: (req, res) => {
    res.render('register');
  },

  updateUser: (req, res) => {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    };

    User.update(user, (user, err) => {
      if (err) {
        return res.status(500).render('/', { msg: 'user not found' });
      } else if (user) {
        return res.redirect('/');
      }
    });
  },

  deleteUser: (req, res) => {
    const { id } = req.params;

    User.destroy({ where: { id } }, (user, err) => {
      if (err) {
        return res.status(500).render('register', { msg: 'user not found' });
      } else if (user) {
        return res.redirect('/api/v1/users/login');
      }
    });
  },
};
