'use strict';

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {}

  User.init({
    name: {
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          args: true,
          message: 'Please enter your Name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          args: true,
          message: 'Please enter your Email'
        },
        isEmail: {
          args: true,
          message: 'Your Email is Invalid'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          args: true,
          message: 'Please enter your Password'
        }
      }
    },
    organization: DataTypes.STRING
  }, 
  { 
    hooks: {
      beforeCreate: (user, opt) => {
        user.organization = 'Hacktiv8 Indonesia'
        user.password = hashPassword(user.password)
      }
  },
    sequelize 
  });

  User.associate = function(models) {
    User.hasMany(models.Task)
  };
  return User;
};