const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee');

router.get('/', employeeController.getAll);
router.get('/:id', employeeController.getById);
router.post('/', employeeController.create);
router.put('/:id', employeeController.update);

module.exports = router;
