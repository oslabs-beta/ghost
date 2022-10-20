const express = require('express')
const app = express();
// const path = require('path');

//import routers here if we have them
const cloudwatchController = require('./controllers/cloudwatchController');

app.use(express.json());

//logs what path and fetch method is used when run
// app.use((req, res, next) => {
//   console.log(req.path, req.method)
//   return next();
// })

app.get('/metrics/get', 
  cloudwatchController.dummy, 
  (req, res) => {
    res.status(200).json(res.locals.dummy)
})

app.post('/metrics/post', 
  cloudwatchController.dummy, 
  (req, res, next) => {
    res.locals.body = { ...req.body }
    next();
  },
  (req, res) => {
    const returnObj = {
      dummy: res.locals.dummy,
      body: res.locals.body
    }
  res.status(200).json(returnObj)
})

// app.post('/metrics', 
//   cloudwatchController.getLogs,
//   (req, res) => {
//     res.status(200).json('whatvr res.locals we save data in')
//   }
// )

//undefined route handler
app.use('/', (req, res) => {
  res.status(404).send('Invalid route endpoint');
})

//global error handler
app.use((err, req, res, next) => {
  let defaultErr = {
    status: 500,
    log: 'Express error handler caught unknown middleware error',
    message: {err: 'An error occurred'}
  }
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj);
  return res.status(errObj.status).json(errObj.message);
})

//listen on port
app.listen(3000, () => {
  console.log('listening on 3000')
})