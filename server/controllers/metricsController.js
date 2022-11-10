const { CloudWatchClient, GetMetricStatisticsCommand  } = require("@aws-sdk/client-cloudwatch")
const { convertToUnix, convertTime } = require("../assets/timeFunctions");
const regionController = require('./regionController')

const metricsController = {};

metricsController.getMetrics = (req, res, next) => {
  const client = new CloudWatchClient(regionController.currentRegion); //req.body.region (object with key/value pair)
  const input = {
    "StartTime": new Date(convertToUnix(req.body.startTime)), // "10/27/2022, 12:00:00 AM"
    "EndTime": new Date(convertToUnix(req.body.endTime)), // "10/27/2022, 11:59:59 PM"
    "MetricName": req.body.metricName,
    "Namespace": "AWS/Lambda",
    "Period": 60, //req.body.period (60, 300, 3600)
    "Statistics": ["Sum", "Maximum", "Minimum", "Average"], //req.body.statistics (should be an array)
    "Dimensions": [
      {
        "Name": "FunctionName",
        "Value": req.body.functionName 
      },
      {
        "Name": "Resource",
        "Value": req.body.functionName 
      }
    ]
  };

  const command = new GetMetricStatisticsCommand(input);

  client.send(command)
    .then(data => {
      const metric = {};
      metric.Label = data.Label;
      metric.Datapoints = data.Datapoints.map(datapoint => {
        datapoint.Timestamp = convertTime(datapoint.Timestamp);
        return datapoint;
      })
      res.locals.metricStats = metric;
      return next()
    })
    .catch(error => {
      console.log("error in get Metric Stats: ", error.name)
      return next(error)
    })
}

module.exports = metricsController;