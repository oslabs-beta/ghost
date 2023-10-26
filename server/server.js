const express = require('express');

const app = express();

app.use(express.json());

// import routes
const mainRouter = require('./routes/mainRouter');
const metricRouter = require('./routes/metricRouter');
const priceRouter = require('./routes/priceRouter');
const permissionRouter = require('./routes/permissionRouter');
const logRouter = require('./routes/logRouter');

// define routes
app.use('/main', mainRouter);

app.use('/metric', metricRouter);

app.use('/price', priceRouter);

app.use('/permission', permissionRouter);

app.use('/log', logRouter);

// undefined route handler
app.use('/', (req, res) => {
  res.status(404).send('Invalid route endpoint');
});

// global error handler
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
});

// listen on port
app.listen(3000, () => {
  console.log('listening on 3000 on server R');
});
