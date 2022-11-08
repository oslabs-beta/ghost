const express = require('express');
const lambdaController = require('../controllers/lambdaController');
const regionController = require('../controllers/regionController')

const router = express.Router();

router.get('/functions',
  lambdaController.getFunctions,
  (req, res) => {
    res.status(200).json(res.locals.functions)
  }
)

router.post('/changeRegion',
  regionController.changeRegion,
  (req, res) => {
    res.status(200).json(res.locals.response)
  }
)

module.exports = router;