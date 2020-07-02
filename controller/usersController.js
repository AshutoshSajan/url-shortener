const User = require("../model/User");

module.exports = {
	getUser: (req, res) => {
		res.render("login");
	},

	loginUser: (req, res) => {
		const { email, passowrd } = req.body;

		User.findOne({ email }, (user, err) => {
			if (err) {
				res.status(500).render("/login", { msg: "user not found" });
			} else if (user) {
				const match = user.validPassword(passowrd, user.passowrd);
				if (match) {
					res.redirect("index");
				} else if (!match) {
					res.render("/login", { msg: "Invalid email or password" });
				}
			}
		});
	},

	getRegisterUserForm: (req, res) => {
		res.render("register");
	},

	registerUser: (req, res) => {
		const newUser = {
			firstName: req.body.first_name,
			lastName: req.body.last_name,
			userName: req.body.user_name,
			email: req.body.email,
			password: req.body.password,
		};

		User.create(newUser, (user, err) => {
			if (err) {
				res.status(500).render("/register", { msg: "user not found" });
			} else if (user) {
				res.redirect("/login");
			}
		});
	},

	getUpdateUserForm: (req, res) => {
		res.render("register");
	},

	updateUser: (req, res) => {
		const newUser = {
			firstName: req.body.first_name,
			lastName: req.body.last_name,
			userName: req.body.user_name,
			email: req.body.email,
			password: req.body.password,
		};

		User.update(newUser, (user, err) => {
			if (err) {
				res.status(500).render("/", { msg: "user not found" });
			} else if (user) {
				res.redirect("/");
			}
		});
	},

	deleteUser: (req, res) => {
		const { id } = req.params;

		User.destroy({ where: { id } }, (user, err) => {
			if (err) {
				res.status(500).render("/register", { msg: "user not found" });
			} else if (user) {
				res.redirect("/login");
			}
		});
	},
};
