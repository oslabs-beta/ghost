const {
  CloudWatchLogsClient,
  DescribeLogStreamsCommand,
  GetLogEventsCommand,
} = require('@aws-sdk/client-cloudwatch-logs');
const regionController = require('./regionController');

const cloudwatchController = {};

cloudwatchController.getLogStreams = (req, res, next) => {
  const client = new CloudWatchLogsClient(regionController.currentRegion); // req.body.region (object with key/value pair)

  const input = {
    logGroupName: `/aws/lambda/${req.body.functionName}`,
    descending: true,
  };

  req.body.date ? (input.logStreamNamePrefix = req.body.date) : null;

  const command = new DescribeLogStreamsCommand(input);

  client
    .send(command)
    .then((data) => {
      const logStreams = data.logStreams.map((streamObj) => {
        const streamData = {};
        streamData.arn = streamObj.arn;
        streamData.streamName = streamObj.logStreamName;
        return streamData;
      });
      res.locals.logStreams = [...logStreams];
      return next();
    })
    .catch((err) => {
      console.log('error in getLogStreams: ', err);
      return next('error in cw.getLogStreams');
    });
};

cloudwatchController.getAllLogStreams = async (req, res, next) => {
  const client = new CloudWatchLogsClient(regionController.currentRegion); // req.body.region (object with key/value pair)

  const input = {
    logGroupName: `/aws/lambda/${req.body.functionName}`,
    descending: true,
  };
  req.body.date ? (input.logStreamNamePrefix = req.body.date) : null;

  res.locals.logStreams = [];

  let data = null;

  do {
    data ? (input.nextToken = data.nextToken) : null;
    const command = new DescribeLogStreamsCommand(input);
    data = await client.send(command);
    const logStreams = data.logStreams.map((streamObj) => {
      const streamData = {};
      streamData.arn = streamObj.arn;
      streamData.streamName = streamObj.logStreamName;
      return streamData;
    });
    res.locals.logStreams = res.locals.logStreams.concat(logStreams);
  } while (data.nextToken);

  return next();
};

cloudwatchController.getRawLogs = async (req, res, next) => {
  const client = new CloudWatchLogsClient(regionController.currentRegion);

  const input = {
    logGroupName: `/aws/lambda/${req.body.functionName}`,
    logStreamName: req.body.streamName || res.locals.logStreams[0].streamName,
    // limit: 10
  };

  res.locals.rawLogs = [];

  let data = null;

  do {
    data ? (input.nextToken = data.nextBackwardToken) : null;
    const command = new GetLogEventsCommand(input);
    data = await client.send(command);
    res.locals.rawLogs = res.locals.rawLogs.concat(data.events);
  } while (data.events.length);

  return next();
};

cloudwatchController.iterateStreamsForLogs = async (req, res, next) => {
  res.locals.rawLogs = [];

  const client = new CloudWatchLogsClient(regionController.currentRegion);

  for (const stream of res.locals.logStreams) {
    const input = {
      logGroupName: `/aws/lambda/${req.body.functionName}`,
      logStreamName: stream.streamName,
    };

    let data = null;

    do {
      data ? (input.nextToken = data.nextBackwardToken) : null;
      const command = new GetLogEventsCommand(input);
      data = await client.send(command);
      res.locals.rawLogs = res.locals.rawLogs.concat(data.events);
    } while (data.events.length);
  }

  return next();
};

module.exports = cloudwatchController;
