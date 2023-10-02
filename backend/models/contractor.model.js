module.exports = function (sequelize, DataTypes) {
  const Contractor = sequelize.define('Contractor', {
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
    tableName: 'contractors',
    engine: 'InnoDB',
    charset: 'utf8'
  });

  Contractor.associate = models => {
    models.Contractor.hasMany(models.Assignment, {
      as: 'assignments',
      foreignKey: 'belongToId',
      scope: { belongToId: 'contractor' },
      hooks: true
    });
  };

  return Contractor;
};
