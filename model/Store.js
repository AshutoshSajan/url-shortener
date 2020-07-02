const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Url = require("./Url");

const Store = sequelize.define(
	"Store",
	{
		id: {
			type: Sequelize.UUID,
			primaryKey: true,
			allowNull: false,
			autoIncriment: false,
			defaultValue: Sequelize.UUIDV4,
		},
		url: {
			type: Sequelize.JSON,
		},
	},
	{}
);

Store.hasMany(Url);
Url.belongsTo(Store);

module.exports = Store;
