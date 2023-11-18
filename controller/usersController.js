const User = require('../model/User');

module.exports = {
  getUser: (req, res) => {
    return res.render('login');
  },

  loginUser: (req, res) => {
    const { email, passowrd } = req.body;

    User.findOne({ email }, (user, err) => {
      if (err) {
        return res.status(500).render('/login', { msg: 'user not found' });
      } else if (user) {
        const match = user.validPassword(passowrd, user.passowrd);
        if (match) {
          return res.redirect('index');
        } else if (!match) {
          return res.render('/login', { msg: 'Invalid email or password' });
        }
      }
    });
  },

  getRegisterUserForm: (req, res) => {
    return res.render('register');
  },

  registerUser: (req, res) => {
    User.create(newUser, (user, err) => {
      if (err) {
        return res.status(500).render('/register', { msg: 'user not found' });
      } else if (user) {
        return res.redirect('/login');
      }
    });
  },

  getUpdateUserForm: (req, res) => {
    res.render('register');
  },

  updateUser: (req, res) => {
    User.update(newUser, (user, err) => {
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
        return res.status(500).render('/register', { msg: 'user not found' });
      } else if (user) {
        return res.redirect('/login');
      }
    });
  },
};
