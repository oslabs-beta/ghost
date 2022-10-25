const express = require('express')
const app = express();

const cloudwatchController = require('./controllers/cloudwatchController');
const dataController = require('./controllers/dataController');
const lambdaController = require('./controllers/lambdaController');
const metricsController = require('./controllers/metricsController');

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

app.post('/moreMetrics',
  metricsController.getMetrics,
  (req, res) => {
    res.status(200).json(res.locals.metricStats)
  }
)


//for developer use
app.get('/listMetrics',
  metricsController.listMetrics,
  (req, res) => {
    res.status(200).json(res.locals.metricsList)
  }
)

app.get('/metricStreams',
  metricsController.getMetricStreams,
  (req, res) => {
    res.status(200).json(res.locals.metricStreams)
  }
)

//undefined route handler
app.use('/', (req, res) => {
  res.status(404).send('Invalid route endpoint');
})

//global error handler
app.use((err, req, res, next) => {
  return res.status(500).send('global error handler invoked');
})

//listen on port
app.listen(3000, () => {
  console.log('listening on 3000')
})