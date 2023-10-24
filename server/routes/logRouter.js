const express = require('express');
const cloudwatchController = require('../controllers/cloudwatchController');
const dataController = require('../controllers/dataController');

const router = express.Router();

router.post(
  '/logStreams',
  cloudwatchController.getAllLogStreams,
  (req, res) => {
    res.status(200).json(res.locals.logStreams);
  }
);

router.post('/rawLogs', cloudwatchController.getRawLogs, (req, res) => {
  res.status(200).json(res.locals.rawLogs);
});

router.post(
  '/parsedLogs',
  cloudwatchController.getRawLogs,
  dataController.parseBasic,
  (req, res) => {
    res.status(200).json(res.locals.basicData);
  }
);

module.exports = router;
