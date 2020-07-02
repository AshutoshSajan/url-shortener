const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Url = sequelize.define(
	"Url",
	{
		id: {
			type: Sequelize.UUID,
			primaryKey: true,
			allowNull: false,
			autoIncriment: false,
			defaultValue: Sequelize.UUIDV4,
		},
		url: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: {
				args: true,
				msg: "Url already in use!",
			},
			validate: {
				notEmpty: {
					args: true,
					msg: "url is required!",
				},
			},
		},
		slug: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: {
				args: true,
				msg: "slug already in use!",
			},
			validate: {
				notEmpty: {
					args: true,
					msg: "slug is required!",
				},
			},
		},
	},
	{}
);

module.exports = Url;
