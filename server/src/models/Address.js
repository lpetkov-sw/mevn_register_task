'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    city: DataTypes.STRING,
    zip: DataTypes.STRING,
    street: DataTypes.TEXT
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
    
  };
  return Address;
};