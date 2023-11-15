const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const sequelize = require("../config/database");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const Store = require("./Store");

const User = sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      autoIncriment: false,
      defaultValue: Sequelize.UUIDV4,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "name is required",
        },
        len: {
          args: [3, 30],
          msg: "name must be between 4 and 30 letters",
        },
        isAlpha: {
          args: true,
          msg: "name must only contain letters",
        },
      },
    },
    lastName: {
      type: Sequelize.STRING,
    },
    userName: {
      type: Sequelize.STRING(30),
      unique: {
        args: true,
        msg: "Username already in use!",
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "username is required",
        },
        len: {
          args: [3, 30],
          msg: "name must be between 4 and 30 letters",
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "email is required",
        },
        isEmail: {
          args: true,
          msg: "should be a prper email address",
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "password is required",
        },
        min: {
          args: 8,
          msg: "password must be atleast 8 charecters long",
        },
      },
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    phone: {
      type: Sequelize.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Phone number is required",
        },
        min: {
          args: 10,
          msg: "Phone number must be atleast 10 charecters long",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        if (user.email === process.env.ADMIN_EMAIL) {
          user.isAdmin = true;
        }
        const hash = bcrypt.hashSync(user.password, salt);
        if (hash) {
          return (user.password = hash);
        } else {
          return console.error(chalk.red.bold("password hashing error"));
        }
      },
    },

    instanceMethods: {
      validPassword(password, hash) {
        return bcrypt.compare(password, hash, function (err, result) {
          if (err)
            return console.error(chalk.red.bold("password matching error"));
          return result;
        });
      },
    },
  }
);

User.hasOne(Store);
Store.belongsTo(User);

module.exports = User;
