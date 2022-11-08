const express = require('express');
const cloudwatchController = require('../controllers/cloudwatchController');
const dataController = require('../controllers/dataController');
const metricsController = require('../controllers/metricsController');

const router = express.Router();

router.post('/recent',
  cloudwatchController.getLogStreamFirst,
  cloudwatchController.getRawLogsMiddle,
  dataController.parseBasic,
  (req, res) => {
    res.status(200).json(res.locals.basicData)
  }
)

router.post('/custom',
  metricsController.getMetrics,
  (req, res) => {
    res.status(200).json(res.locals.metricStats)
  }
)

router.post('/cold',
  cloudwatchController.getAllLogStreams,
  cloudwatchController.iterateStreamsForLogs,
  dataController.parseBasic,
  dataController.parseColdStarts,
  (req, res) => {
    res.status(200).json(res.locals.coldMetrics)
  }
)

module.exports = router;