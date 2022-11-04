import { Request, Response, NextFunction, RequestHandler } from 'express';
const { convertTime } = require("./timeFunctions");

type Controller = {
  parseBasic: RequestHandler;
}

interface idk {
  requestID: String;
  duration: String;
  billedDuration: String;
  memorySize: String;
  maxMemoryUsed: String;
  initDuration: String;
  timestamp: Number;
}

const dataController: Controller = {
  // what message looks like:
// "message": "REPORT RequestId: 5f57b973-45ed-4a5b-bd6a-1f97e3c1381c\tDuration: 
// 16.56 ms\tBilled Duration: 17 ms\tMemory Size: 128 MB\tMax Memory Used: 57 MB\tInit Duration:
//  134.34 ms\t\n"

  parseBasic : (req: Request, res: Response, next: NextFunction) => {
    try {
      //res.locals.rawLogs is an array of objects
      let basicData: NTC = res.locals.rawLogs.map(logObj => {
        const basicObj = {};
        if (!logObj.message.startsWith('REPORT')) return undefined;
        const messageStringArr: String = logObj.message.trim().split('\t');
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
        // console.log(logObj.timestamp)
        basicObj.timestamp = timestamp;
        return basicObj;
      })

      // now basicData is an array of objects representing a single log
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
      next();
    }
    catch(err) {
      console.error(err);
    }
    
  }
}


module.exports = dataController;