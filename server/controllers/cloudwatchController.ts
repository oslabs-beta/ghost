import express, { Request, Response, NextFunction, RequestHandler } from 'express';
const { CloudWatchLogsClient, DescribeLogStreamsCommand, GetLogEventsCommand } = require("@aws-sdk/client-cloudwatch-logs");

type Controller = {
  getLogStreams: RequestHandler;
  getRawLogs: RequestHandler;
}

type whatToCall = {
  logGroupName: String,
  descending: Boolean,
  logStreamNamePrefix?: Number,
}

interface idk {
  arn?: String;
  streamName?: String;
}

type whatToCall2 = {
  logGroupName: String,
  logStreamName: String,
  nextToken?: String
}

const cloudwatchController: Controller = {

  getLogStreams : (req: Request, res: Response, next: NextFunction) => {
    const client: NTC = new CloudWatchLogsClient({ region: "us-west-1" }); //req.body.region (object with key/value pair)
  
    const input: whatToCall = {
      logGroupName: "/aws/lambda/" + req.body.functionName,
      descending: true,
    };
  
    req.body.date ? input.logStreamNamePrefix = req.body.date : null;
  
    const command: NTC = new DescribeLogStreamsCommand(input);
  
    client.send(command)
      .then(data => {
        const logStreams = data.logStreams.map(streamObj => {
          const streamData: idk = {};
          streamData.arn = streamObj.arn;
          streamData.streamName = streamObj.logStreamName;
          return streamData;
        })
        res.locals.logStreams = [...logStreams];
        return next();
      })
      .catch(err => {
        console.log('error in getLogStreams: ', err)
        return next('error in cw.getLogStreams')
      })
  },
  
  getRawLogs : (req: Request, res: Response, next: NextFunction) => {
    const client: NTC = new CloudWatchLogsClient({ region: "us-west-1" });
  
    const input: whatToCall2 = {
      logGroupName: "/aws/lambda/" + req.body.functionName,
      logStreamName: req.body.streamName
    };
  
    req.body.nextToken ? input.nextToken = req.body.nextToken : null;
  
    const command: NTC = new GetLogEventsCommand(input);
  
    client.send(command)
      .then(data => {
        // res.locals.rawLogs = data.events;
        res.locals.rawLogs = data;
        next();
      })
      .catch(err => {
        console.log('error in getRawLogs: ', err)
        return next('error in cw.getRawLogs')
      })
  }
};




module.exports = cloudwatchController;