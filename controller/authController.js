const User = require('../model/User');

module.exports = {
  isUserLoggedIn: (req, res, next) => {
    const { id } = req.user;
    if (id) {
      User.findOne(id).then((user, err) => {
        if (user) {
          return next();
        } else if (!user) {
          return res.send('user does not exist');
        } else if (err) {
          return next(err);
        }
      });
    }
  },
};
