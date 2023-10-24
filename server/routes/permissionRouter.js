const express = require('express');
const lambdaController = require('../controllers/lambdaController');

const router = express.Router();

router.post('/list', lambdaController.getPolicies, (req, res) => {
  res.status(200).json(res.locals.policies);
});

router.post('/add', lambdaController.addPermission, (req, res) => {
  res.status(200).json('permission added');
});

router.post('/remove', lambdaController.removePermission, (req, res) => {
  res.status(200).json('permission removed');
});

module.exports = router;
