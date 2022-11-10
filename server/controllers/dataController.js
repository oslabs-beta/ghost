const { convertTime } = require("../assets/timeFunctions");

const dataController = {}

dataController.parseBasic = (req, res, next) => {
  try {
    //res.locals.rawLogs is an array of objects
    let basicData = res.locals.rawLogs.map(logObj => {
      const basicObj = {};
      if (!logObj.message.startsWith('REPORT')) return undefined;
      const messageStringArr = logObj.message.trim().split('\t');
      messageStringArr[0] = messageStringArr[0].slice(7);
      for (let message of messageStringArr) {
        const prop = message.split(':')

        let key = prop[0];
        key = key[0].toLowerCase() + key.slice(1);
        key = key.replaceAll(' ', '')

        const value = prop[1].trim();
        
        basicObj[key] = value;
      }
      const timestamp = convertTime(logObj.timestamp);
      basicObj.timestamp = timestamp;
      return basicObj;
    })

    //now basicData is an array of objects representing a single log
    //filter out all undefined values from the extraneous logs
    basicData = basicData.filter(ele => ele)

    //iterate through rawLogs again, looking for any error messages, and adding them to 
    //the appropriate logObject
    for (let errObj of res.locals.rawLogs) {
      if (errObj.message.includes('ERROR')) {
        const errorArr = errObj.message.split('\t')
        const requestId = errorArr[1].trim();
        for (let logObj of basicData) {
          if (logObj.requestId === requestId) logObj.error = true;
        }
      }
    }

    res.locals.basicData = basicData;
    return next();
  }
  catch(err) {
    console.log("error in parseBasic", err);
    return next(err)
  }
  
}

dataController.parsePrice = (req, res, next) => {
  //res.locals.basicData is an array of basic Data objects
  let totalBilledDuration = 0;
  let invocations = 0;

  for (let logEvent of res.locals.basicData) {
    invocations++
    totalBilledDuration += parseInt(logEvent.billedDuration, 10);
  }

  res.locals.priceMetrics = {
    durationTotal: totalBilledDuration,
    invocationsTotal: invocations
  };

  return next();
}

dataController.parseColdStarts = (req, res, next) => {
  //res.locals.basicData is an array of basic Data objects
  //initDuration

  const coldMetrics = [];

  for (let logEvent of res.locals.basicData) {
    if (logEvent.hasOwnProperty("initDuration")) {
      const coldStart = {
        initDuration: logEvent.initDuration,
        timestamp: logEvent.timestamp
      }
      coldMetrics.push(coldStart)
    }
  }

  res.locals.coldMetrics = coldMetrics;

  return next();
}


module.exports = dataController;