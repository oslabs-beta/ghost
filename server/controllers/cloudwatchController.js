const { CloudWatchLogsClient, AssociateKmsKeyCommand } = require("@aws-sdk/client-cloudwatch-logs");
const { CloudWatchClient } = require("@aws-sdk/client-cloudwatch");

const run = async () => {
  try {
    const data = await CloudWatchClient.send(new ListMetricsCommand(params));
    console.log("Success. Metrics:", JSON.stringify(data.Metrics));
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
const cloudwatchController = {};

cloudwatchController.getLogs = (req, res, next) => {
  //might need to get some data from req.body to use in params
  //for now we can hard code the data expected (like the LogGroupName);
  const params = {
    Dimensions: [
      {
        Name: "LogGroupName" /* required */,
      },
    ],
    MetricName: "IncomingLogEvents",
    Namespace: "AWS/Logs",
  };

  //figure which import client to create a new Instance of
  const client = new CloudWatchLogsClient({region: 'REGION IN ALL CAPS GOES HERE'})

  //use promise based or async function to call a method on client instance to get logs

  //example call the run function here(NOTE: run fn def needs to be modified to match syntax)
  run()

}

cloudwatchController.dummy = (req, res, next) => {
  res.locals.dummy = 'the req went through dummy'
  return next();
}


module.exports = cloudwatchController;