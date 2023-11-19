const bcrypt = require('bcrypt');

const validPassword = (password, hash) => {
  try {
    return bcrypt.compareSync(password, hash);
  } catch (err) {
    console.error(chalk.red.bold('password matching error'), err.message);
    throw err;
  }
};

module.exports = { validPassword };
