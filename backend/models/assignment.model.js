module.exports = function (sequelize, DataTypes) {
  const Assignment = sequelize.define('Assignment', {
    months: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'Months count should be from 1 to 12.'
        },
        max: {
          args: 12,
          msg: 'Months count should be from 1 to 12.'
        }
      }
    },
    rndPercentage: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      validate: {
        isExist: function (val) {
          if (!val && val !== 0) throw new Error('RnD Percentage is required.');
          if (val < 0 || val > 100) throw new Error('RnD Percentage should be from 0 to 100 percent.');
        }
      }
    },
    total: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return Number(this.getDataValue('months')) * Number(this.getDataValue('rndPercentage')) / 12;
      }
    },
    belongToType: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isExist: function (val) {
          if (!val) throw new Error('Belong to type is required.');
          if (val != 'contractor' && val != 'employee') throw new Error('Should be a valid belong to type');
        },
      }
    }
  }, {
    hooks: {
      afterCreate: async (instance, options) => {
        const parentInstanceName = instance.belongToType[0].toUpperCase() + instance.belongToType.slice(1);
        const parent = await instance[`get${parentInstanceName}`]();
        await parent.increment({ total: 1 });
      },
      afterDestroy: async (instance, options) => {
        const parentInstanceName = instance.belongToType[0].toUpperCase() + instance.belongToType.slice(1);
        const parent = await instance[`get${parentInstanceName}`]();
        await parent.decrement({ total: 1 });
      }
    },
    underscored: true,
    freezeTableName: true,
    tableName: 'assignment',
    engine: 'InnoDB',
    charset: 'utf8'
  });

  Assignment.associate = models => {
    models.Assignment.belongsTo(models.Employee, {
      as: 'employee',
      foreignKey: 'belongToId',
      scope: { belongToType: 'employee' }
    });
    models.Assignment.belongsTo(models.Contractor, {
      as: 'contractor',
      foreignKey: 'belongToId',
      scope: { belongToType: 'contractor' }
    });
    models.Assignment.belongsTo(models.Project, { as: 'project' });
  };

  return Assignment;
};
