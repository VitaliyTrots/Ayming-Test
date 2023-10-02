module.exports = function (sequelize, DataTypes) {
  const Project = sequelize.define('Project', {
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
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'projects',
    engine: 'InnoDB',
    charset: 'utf8'
  });

  Project.associate = models => {
    models.Project.hasMany(models.Assignment, {
      as: 'assignments',
      foreignKey: 'projectId'
    });
  };

  return Project;
};
