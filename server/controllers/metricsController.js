const { CloudWatchClient, GetMetricDataCommand, ListMetricsCommand  } = require("@aws-sdk/client-cloudwatch")

const metricsController = {};

metricsController.getMetrics = (req, res, next) => {
    const client = new CloudWatchClient({ region: "us-west-1" });

    const input = {
      "StartTime": new Date(1666402900000),
      "EndTime": new Date(1666492997504),
      "MetricDataQueries": [
        {
          "Id": "m1",
          "Label": "m1Label",
          "MetricStat": {
            "Metric": {
              "MetricName": "Invocations",
              "Namespace": "AWS/Lambda",
              "Dimensions": [
                {
                    "Name": "FunctionName",
                    "Value": "advancedTest"
                },
                {
                    "Name": "Resource",
                    "Value": "advancedTest"
                }
              ]
            },
            "Period": 300,
            "Stat": "Average"
          }
        }
      ]
    }

    /*
    {
            "Namespace": "AWS/Lambda",
            "MetricName": "Duration",
            "Dimensions": [
                {
                    "Name": "FunctionName",
                    "Value": "advancedTest"
                },
                {
                    "Name": "Resource",
                    "Value": "advancedTest"
                }
            ]
        },
    */

    const command = new GetMetricDataCommand(input);
    
    client.send(command)
      .then((data) => {
        // console.log(data)
        res.locals.metricsData = data;
        next();
      })
      .catch(error => {
        console.log("error in get Metrics", error)
        next(error)
      })
}

metricsController.listMetrics = (req, res, next) => {
  const client = new CloudWatchClient({ region: "us-west-1" });

  const input = {};;

  const command = new ListMetricsCommand(input);

  client.send(command)
    .then((data) => {
      // console.log(data)
      //data is object with Metrics key which has the value of an array
        //within the array, a bucnh of nested obj -- learn how to parse through
      res.locals.metricsList = data;
      next();
    })
    .catch(error => {
      console.log("error in List Metrics", error)
      next(error)
    })
}

module.exports = metricsController;