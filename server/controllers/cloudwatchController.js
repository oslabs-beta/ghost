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
      res.locals.logStreams = logStreams;
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



module.exports = cloudwatchController;