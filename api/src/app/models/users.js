'use strict'
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {isEmail: true},
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    number:{
      allowNull: false,
      type: DataTypes.STRING
    }
    // role: {
    //   allowNull: false,
    //   defaultValue: 'normal',
    //   type: DataTypes.STRING,
    //   validate: {isIn: [['normal', 'admin']]}
    // }
  })
  return users
}