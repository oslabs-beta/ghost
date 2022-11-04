const { CloudWatchClient, ListMetricsCommand, ListMetricStreamsCommand, GetMetricStatisticsCommand   } = require("@aws-sdk/client-cloudwatch")
const { convertToUnix, convertTime } = require("./timeFunctions");

const metricsController = {};

//for developer use
metricsController.listMetrics = (req, res, next) => {
  const client = new CloudWatchClient({ region: "us-west-1" });

  const input = {};

  const command = new ListMetricsCommand(input);

  client.send(command)
    .then(data => {
      res.locals.metricsList = data;
      return next();
    })
    .catch(error => {
      console.log("error in List Metrics", error)
      next(error)
    })
}

metricsController.getMetricStreams = (req, res, next) => {
  const client = new CloudWatchClient({ region: "us-west-1" });

  const input = {};;

  const command = new ListMetricStreamsCommand(input);

  client.send(command)
    .then(data => {
      res.locals.metricStreams = data;
      return next()
    })
    .catch(error => {
      console.log("error in get Metric Streams: ", error)
      return next(error)
    })
}

metricsController.getMetrics = (req, res, next) => {
  const client = new CloudWatchClient({ region: "us-west-1" }); //req.body.region (object with key/value pair)

  const input = {
    "StartTime": new Date(convertToUnix(req.body.startTime)), // "10/27/2022, 12:00:00 AM"
    "EndTime": new Date(convertToUnix(req.body.endTime)),
    "MetricName": req.body.metricName,
    "Namespace": "AWS/Lambda",
    "Period": 60, //req.body.period (60, 300, 3600)
    "Statistics": ["Sum", "Maximum", "Minimum", "Average"], //req.body.statistics (should be an array)
    "Dimensions": [
      {
        "Name": "FunctionName",
        "Value": req.body.functionName //lambda function name (i.e. advancedTest)
      },
      {
        "Name": "Resource",
        "Value": req.body.functionName //lambda function name (i.e. advancedTest)
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
      console.log("error in get Metric Stats: ", error)
      return next(error)
    })
}

module.exports = metricsController;