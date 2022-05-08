const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = new Sequelize({
    dialect: "mysql",
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
})

const Categories = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    used_at: {
        type: Sequelize.DATE
    }
});

const Word = sequelize.define('word', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    term: {
        type: Sequelize.STRING,
        allowNull: false
    },
    term_formatted: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: Categories.id,
    },
    count_typed: {
        type: Sequelize.INTEGER,
        default: 0,
        allowNull: false,
    },
})
module.exports = {
    connection: sequelize,
    Categories,
    Word
}