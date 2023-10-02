const _ = require('lodash');
const { Assignment, sequelize } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const assignments = await Assignment.findAll();
      res.send({ data: assignments, error: null });
    } catch (err) {
      console.error('Error: ', err);
      res.status(err.status || 400).send({ data: null, error: err.message });
    }
  },
  async getById(req, res) {
    try {
      const assignment = await Assignment.findByPk(req.params.id);
      res.send({ data: assignment, error: null });
    } catch (err) {
      console.error('Error: ', err);
      res.status(err.status || 400).send({ data: null, error: err.message });
    }
  },
  async create(req, res) {
    try {
      const assignment = await Assignment.create(req.body);
      res.send({ data: assignment, error: null });
    } catch (err) {
      console.error('Error: ', err);
      res.status(err.status || 400).send({ data: null, error: err.message });
    }
  },
  async update(req, res) {
    try {
      let assignment = await Assignment.findByPk(req.params.id);
      if (!assignment) throw new Error('Assignment does not exist');

      _.forEach(req.body, (value, field) => {
        assignment[field] = value;
      });
      assignment = await assignment.save();

      res.send({ data: assignment, error: null });
    } catch (err) {
      console.error('Error: ', err);
      res.status(err.status || 400).send({ data: null, error: err.message });
    }
  }
};
