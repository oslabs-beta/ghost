const dataController = {}

function convertTime(timestamp) {
  const milliseconds = timestamp * 1000; //convert to milliseconds from unixTimestamp
  const dateObject = new Date(milliseconds); //declare new data object
  const humanDataFormat = dateObject.toLocaleString(); //convert to human-readable string
  return humanDataFormat
}

// what message looks like:
// "message": "REPORT RequestId: 5f57b973-45ed-4a5b-bd6a-1f97e3c1381c\tDuration: 
// 16.56 ms\tBilled Duration: 17 ms\tMemory Size: 128 MB\tMax Memory Used: 57 MB\tInit Duration:
//  134.34 ms\t\n",

dataController.parseBasic = (req, res, next) => {
  try {
    //res.locals.rawLogs is an array of objects
    let basicData = res.locals.rawLogs.map(logObj => {
      if (!logObj.message.startsWith('REPORT')) return undefined;
      const messageStringArr = logObj.message.trim().split('\t');
      messageStringArr[0] = messageStringArr[0].slice(7);
      const basicObj = {};
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

    // now basicData is an array of objects representing a single log
    basicData = basicData.filter(ele => ele)

    res.locals.basicData = basicData;
    next();
  }
  catch(err) {
    console.error(err);
  }
  
}



module.exports = dataController;