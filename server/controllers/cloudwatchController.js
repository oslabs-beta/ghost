const { CloudWatchLogsClient, DescribeLogStreamsCommand, GetLogEventsCommand } = require("@aws-sdk/client-cloudwatch-logs");

const cloudwatchController = {};

cloudwatchController.getLogStreams = (req, res, next) => {
  const client = new CloudWatchLogsClient({ region: "us-west-1" }); //req.body.region (object with key/value pair)

  const input = {
    logGroupName: "/aws/lambda/" + req.body.functionName,
    descending: true,
  };

  req.body.date ? input.logStreamNamePrefix = req.body.date : null;

  const command = new DescribeLogStreamsCommand(input);

  client.send(command)
    .then(data => {
      const logStreams = data.logStreams.map(streamObj => {
        const streamData = {};
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
}

cloudwatchController.getRawLogs = (req, res, next) => {
  const client = new CloudWatchLogsClient({ region: "us-west-1" });

  const input = {
    logGroupName: "/aws/lambda/" + req.body.functionName,
    logStreamName: req.body.streamName,
  };

  const command = new GetLogEventsCommand(input);

  client.send(command)
    .then(data => {
      res.locals.rawLogs = data.events;
      next();
    })
    .catch(err => {
      console.log('error in getRawLogs: ', err)
      return next('error in cw.getRawLogs')
    })
}

cloudwatchController.getAllLogStreams = async (req, res, next) => {
  const client = new CloudWatchLogsClient({ region: "us-west-1" }); //req.body.region (object with key/value pair)

  const input = {
    logGroupName: "/aws/lambda/" + req.body.functionName,
    descending: true,
  };
  req.body.date ? input.logStreamNamePrefix = req.body.date : null;

  res.locals.logStreams = [];

  let data = null;

  do {
    data ? input.nextToken = data.nextToken : null
    const command = new DescribeLogStreamsCommand(input);
    data = await client.send(command);
    const logStreams = data.logStreams.map(streamObj => {
      const streamData = {};
      streamData.arn = streamObj.arn;
      streamData.streamName = streamObj.logStreamName;
      return streamData;
    })
    res.locals.logStreams = res.locals.logStreams.concat(logStreams);
  } while(data.nextToken) 

  return next();
}

cloudwatchController.getAllRawLogs = async (req, res, next) => {
  const client = new CloudWatchLogsClient({ region: "us-west-1" });

  const input = {
    logGroupName: "/aws/lambda/" + req.body.functionName,
    logStreamName: req.body.streamName,
    // limit: 10
  };

  res.locals.rawLogs = [];

  let data = null;

  do {
    data ? input.nextToken = data.nextBackwardToken : null
    const command = new GetLogEventsCommand(input);
    data = await client.send(command);
    res.locals.rawLogs = res.locals.rawLogs.concat(data.events)
  } while (data.events.length)
  
  return next();
}





module.exports = cloudwatchController;