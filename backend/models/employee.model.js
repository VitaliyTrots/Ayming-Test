module.exports = function (sequelize, DataTypes) {
  const Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 2,
          msg: 'Name should contain min 2 characters.'
        },
        notEmpty: {
          msg: 'The name is required.'
        }
      }
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'employees',
    engine: 'InnoDB',
    charset: 'utf8'
  });

  Employee.associate = models => {
    models.Employee.hasMany(models.Assignment, {
      as: 'assignments',
      foreignKey: 'belongToId',
      scope: { belongToId: 'employee' },
      hooks: true
    });
  };

  return Employee;
};
