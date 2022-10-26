const priceTable = require('./priceTable');

const pricingController = {};

pricingController.getEstimate = (req, res, next) => {
  //req.body will have these props:
  //type: "x86_64" or "Arm"
  //memorySize: 128

  //billedDurationTotal: Number
  //invocationsTotal: Number
  const typeKey = req.body.type;
  const memKey = req.body.memorySize;
  const duration = req.body.billedDurationTotal;
  const invocations = req.body.invocationsTotal

  console.log('this is the price table: ', priceTable);
  let tier = 'first';
  //1mg = 0.001gb, 1ms = 0.001sec
  // if ()
  const cost = (priceTable[tier][memKey] * duration) + (Math.floor(invocations / 1000000) * 0.2) // memorySize/duration + requests charges

  res.locals.cost = cost;
  return next();
}

module.exports = pricingController;

  //req.body needs to include how many metrics are being sent to cloudwatch
  //All custom metrics charges are prorated by the hour and 
  //metered only when you send metrics to CloudWatch.
  //first 10,000 metrics is 30 cents
  //next 240,000 metrics is 10 cents
  //next 750,000 metrics is 5 cents
  //over 1 mil metrics is 2 cents

  //APIs (may be more useful as stretch)
  //You can request up to five statistics for the same metric in a single GetMetricData API request. 
  //Additional statistics are billed as an additional metric.
  //GetMetricData, GetInsigntRuleReport $0.01 per 1000 metrics requested
  //GetMetricWidgetImage $0.02 per 1000 metrics requested