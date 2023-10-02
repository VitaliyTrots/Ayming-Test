const _ = require('lodash');
const { Employee, sequelize } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const employees = await Employee.findAll({
        order: [
          ['id', 'asc']
        ]
      });
      res.send({ data: employees, error: null });
    } catch (err) {
      console.error('Error: ', err);
      res.status(err.status || 400).send({ data: null, error: err.message });
    }
  },
  async getById(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id);
      res.send({ data: employee, error: null });
    } catch (err) {
      console.error('Error: ', err);
      res.status(err.status || 400).send({ data: null, error: err.message });
    }
  },
  async create(req, res) {
    try {
      const employee = await Employee.create(req.body);
      res.send({ data: employee, error: null });
    } catch (err) {
      console.error('Error: ', err);
      res.status(err.status || 400).send({ data: null, error: err.message });
    }
  },
  async update(req, res) {
    try {
      let employee = await Employee.findByPk(req.params.id);
      if (!employee) throw new Error('Employee does not exist');

      _.forEach(req.body, (value, field) => {
        employee[field] = value;
      });
      employee = await employee.save();

      res.send({ data: employee, error: null });
    } catch (err) {
      console.error('Error: ', err);
      res.status(err.status || 400).send({ data: null, error: err.message });
    }
  }
};
