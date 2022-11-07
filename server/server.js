// import { Express, Request, Response } = require('express');
const express = require('express');
const app = express();

const cloudwatchController = require('./controllers/cloudwatchController');
const dataController = require('./controllers/dataController');
const lambdaController = require('./controllers/lambdaController');
const metricsController = require('./controllers/metricsController');
const priceController = require('./controllers/priceController')
const regionController = require('./controllers/regionController')

app.use(express.json());

app.get('/test', 
  (req, res) => {
    res.status(200).send('test works')
  }
)

app.get('/functions', 
  lambdaController.getFunctions,
  (req, res) => {
    res.status(200).json(res.locals.functions)
  }
)

app.post('/changeRegion',
  regionController.changeRegion,
  (req, res) => {
    res.status(200).json(res.locals.response)
  }
)

app.post('/moreMetrics',
  metricsController.getMetrics,
  (req, res) => {
    res.status(200).json(res.locals.metricStats)
  }
)

app.post('/logStreams', 
  cloudwatchController.getLogStreams,
  (req, res) => {
    res.status(200).json(res.locals.logStreams)
  }
)

app.post('/rawLogs', 
  cloudwatchController.getRawLogs,
  (req, res) => {
    res.status(200).json(res.locals.rawLogs)
  }
)

app.post('/basicMetrics',
  cloudwatchController.getRawLogs,
  dataController.parseBasic,
  (req, res) => {
    res.status(200).json(res.locals.basicData)
  }
)

app.post('/functionConfig',
  lambdaController.functionConfig,
  (req, res) => {
    res.status(200).json(res.locals.functionConfig)
  }
)

app.post('/priceCalc',
  priceController.getEstimate,
  (req, res) => {
    res.status(200).json(res.locals.cost)
  }
)

app.post('/priceHistory',
  priceController.getHistory,
  (req, res) => {
    res.status(200).json(res.locals.cost)
  }
)

app.post('/logStreamsAll',
  cloudwatchController.getAllLogStreams,
  (req, res) => {
    res.status(200).json(res.locals.logStreams)
  }
)

app.post('/rawLogsAll',
  cloudwatchController.getAllRawLogs,
  (req, res) => {
    res.status(200).json(res.locals.rawLogs)
  }
)

app.post('/priceMetrics',
  cloudwatchController.getAllRawLogs,
  dataController.parseBasic,
  dataController.parsePrice,
  (req, res) => {
    res.status(200).json(res.locals.priceMetrics)
  }
)

app.post('/coldMetrics',
  cloudwatchController.getAllRawLogs,
  dataController.parseBasic,
  dataController.parseColdStarts,
  (req, res) => {
    res.status(200).json(res.locals.coldMetrics)
  }
)

app.post('/priceMetricsPlus',
  cloudwatchController.getAllLogStreams,
  cloudwatchController.iterateStreamsForLogs,
  dataController.parseBasic,
  dataController.parsePrice,
  (req, res) => {
    res.status(200).json(res.locals.priceMetrics)
  }
)

app.post('/coldMetricsPlus',
  cloudwatchController.getAllLogStreams,
  cloudwatchController.iterateStreamsForLogs,
  dataController.parseBasic,
  dataController.parseColdStarts,
  (req, res) => {
    res.status(200).json(res.locals.coldMetrics)
  }
)

app.post('/listPermissions',
  lambdaController.getPolicies,
  (req, res) => {
    res.status(200).json(res.locals.policies)
  }
)

app.post('/addPermission',
  lambdaController.addPermission,
  (req, res) => {
    res.status(200).json("permission added")
  }
)

app.post('/removePermission',
  lambdaController.removePermission,
  (req, res) => {
    res.status(200).json("permission removed")
  }
)

//for developer use

app.get('/listMetrics',
  metricsController.listMetrics,
  (req, res) => {
    res.status(200).json(res.locals.metricsList)
  }
)

//undefined route handler
app.use('/', (req, res) => {
  res.status(404).send('Invalid route endpoint');
})

//global error handler
app.use((err, req, res, next) => {
  const errObj = {
    log: 'global error handler invoked',
    status: 400,
    message: err,
  };
  if (err.name === 'InvalidParameterCombinationException') {
    errObj.tooManyDatapoints = true;
  }
  return res.status(errObj.status).json(errObj);
})

//listen on port
app.listen(3000, () => {
  console.log('listening on 3000')
})