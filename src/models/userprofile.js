'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProfile.belongsTo(models.User, {
         foreignKey: 'userId',
        as: 'userProfile'
      });
    }
  }
  UserProfile.init({
    userId: DataTypes.INTEGER,
    fullname: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    maritalStatus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};