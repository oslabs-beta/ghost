const { CloudWatchLogsClient, DescribeLogStreamsCommand  } = require("@aws-sdk/client-cloudwatch-logs");
// const { CloudWatchClient } = require("@aws-sdk/client-cloudwatch");

const cloudwatchController = {};



cloudwatchController.getLogs = (req, res, next) => {
  const client = new CloudWatchLogsClient({ region: "us-west-1" });

  const input = {
    logGroupName: "/aws/lambda/HelloMysteryGang"
  };

  const command = new DescribeLogStreamsCommand(input)

  //now we can use the api with the syntax client.send(command)
  client.send(command)
    .then(data => {
      res.locals.logs = data;
      return next();
    })
    .catch(err => {
      console.log('the err is ', err)
      return next({
        status: 500,
        log: 'Express error handler caught middleware error in getLogs',
        message: {err: 'An error occurred'}
      })
    })

}

cloudwatchController.dummy = (req, res, next) => {
  res.locals.dummy = 'the req went through dummy'
  return next();
}


module.exports = cloudwatchController;