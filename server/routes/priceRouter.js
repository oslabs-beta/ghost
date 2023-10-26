const express = require('express');
const lambdaController = require('../controllers/lambdaController');
const priceController = require('../controllers/priceController');
const cloudwatchController = require('../controllers/cloudwatchController');
const dataController = require('../controllers/dataController');

// controllers import here

const router = express.Router();

router.post('/defaultConfig', lambdaController.functionConfig, (req, res) => {
  res.status(200).json(res.locals.functionConfig);
});

router.post('/calc', priceController.getEstimate, (req, res) => {
  res.status(200).json(res.locals.cost);
});

router.post(
  '/history',
  cloudwatchController.getAllLogStreams,
  cloudwatchController.iterateStreamsForLogs,
  dataController.parseBasic,
  dataController.parsePrice,
  lambdaController.functionConfig,
  priceController.getEstimate,
  (req, res) => {
    res.status(200).json(res.locals.cost);
  }
);

module.exports = router;
