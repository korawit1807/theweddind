const {  DataTypes } = require('sequelize');
const { sequelize } = require('../connect')
const moment = require('moment')
const blessing = sequelize.define('blessing', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    blessing: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            try {
                let date = this.getDataValue('date');
                date = new Date(date);
                date = moment(date).format("YYYY-MM-DD")
                return date ?? null
            } catch (error) {
                return null
            }
        }
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: null
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['name']
        }
    ]
});

blessing.sync({ alter: true });

module.exports = blessing