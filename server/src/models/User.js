'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    salutation: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    birthday: DataTypes.DATE,
    streetNo: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    
  };
  return User;
};