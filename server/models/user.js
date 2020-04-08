'use strict';

const bcrypt = require('bcrypt')

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
          msg: 'Please enter your Name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          args: true,
          msg: 'Please enter your Email'
        },
        isEmail: {
          args: true,
          msg: 'Your Email Invalid'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          args: true,
          msg: 'Please enter your Password'
        }
      }
    },
    organization: DataTypes.STRING
  }, 
  { 
    hooks: {
      beforeCreate: (user, opt) => {
        user.organization = 'Hacktiv8 Indonesia'
        user.password = bcrypt.hashSync(user.password, 8)
      }
  },
    sequelize 
  });

  User.associate = function(models) {
    User.hasMany(models.Task)
  };
  return User;
};