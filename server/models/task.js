'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Task extends Model {}

  Task.init({
    title: {
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          args: true,
          message: 'Please enter Task Title'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          args: true,
          message: 'Please enter Task Description'
        }
      }
    },
    category: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, { sequelize });

  Task.associate = function(models) {
    Task.belongsTo(models.User)
  };
  return Task;
};