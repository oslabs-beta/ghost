const priceTable = require('./priceTable');

const pricingController = {};

pricingController.getEstimate = (req, res, next) => {
  //req.body will have these props:
  //type: "x86_64" or "Arm"
  //memorySize: 128
  //storage: 512 (number)

  //billedDurationTotal: Number
  //invocationsTotal: Number
  const typeKey = req.body.type;
  const memKey = req.body.memorySize;
  const duration = req.body.billedDurationTotal;
  const invocations = req.body.invocationsTotal;
  let storage = req.body.storage; //must be between 512 to 10240
  //gb-sec = memkey*duration(gb-sec)

  //unit conversions:
  const memoryGb = memKey * 0.0009765625;
  const durationSec = duration * 0.001 * invocations; //dont forget about total duration
  storage = storage * 0.0009765625; //dont forget about something here

  //calculating cost
  let firstTier;
  let middleTier;
  let lastTier;

  let cost = 0;
  
  //gb-sec calculation
  const totalGbSec = memoryGb * durationSec;

  function round(num) {
    return Math.round(num * 100) / 100;
  }

  //tier breakdown calculation
  if (typeKey === 'x86_64') {
    if (totalGbSec <= 6000000000) {
      firstTier = totalGbSec; 
      console.log('firstTier: ',firstTier)
    }
    if (6000000000 < totalGbSec && totalGbSec <= 15000000000) {
      firstTier = 6000000000;
      middleTier = totalGbSec - 6000000000;
      console.log('middleTier: ',middleTier)
    }
    if (15000000000 < totalGbSec) {
      firstTier = 6000000000;
      middleTier = 9000000000;
      lastTier = totalGbSec - 15000000000;
      console.log('lastTier: ',lastTier)
    }

    //calc total
    //calc for firstTier
    cost += firstTier * 0.0000166667;
    console.log('cost at firstTier: ', cost);
    //calc for middleTier
    if (middleTier) cost += middleTier * 0.0000150000;
    console.log('middleTier: ', middleTier * 0.0000150000)
    console.log('cost at middleTier: ', cost)
    //calc for lastTier
    if (lastTier) cost += lastTier * 0.0000133334;
    console.log('lastTier: ', lastTier * 0.0000133334)
    console.log('cost at lastTier: ', cost)

  } else if (typeKey === 'Arm') {
    if (totalGbSec <= 7500000000) firstTier = totalGbSec;
    if (7500000000 < totalGbSec && totalGbSec <= 18750000000) {
      firstTier = 7500000000;
      middleTier = totalGbSec - 7500000000;
    }
    if (18750000000 < totalGbSec) {
      firstTier = 7500000000;
      middleTier = 11250000000;
      lastTier = totalGbSec - 18750000000;
    }

    //calc total
    //calc for firstTier
    cost += firstTier * 0.0000133334;
    //calc for middleTier
    if (middleTier) cost += middleTier * 0.0000120001;
    //calc for lastTier
    if (lastTier) cost += lastTier * 0.0000106667;
  }

  //add the cost for invocations
  cost += round(invocations * 0.0000002);
  console.log('invocations is: ', invocations)
  console.log('invocations cost added is: ', round(invocations * 0.0000002))

  //billable portion of storage
  console.log('original storage in gb: ', storage)
  storage = round(storage * 0.0009765625 - 0.5);
  console.log('billable storage in gb: ', storage)
  //get total storage
  storage = round(storage * durationSec);
  console.log('total storage in GB-sec: ', storage)
  //get total cost 
  cost += (storage * 0.000000037) > 0 ? (storage * 0.000000037) : 0;
  console.log('cost of storage: ', storage * 0.000000037)
  
  //respond with cost
  res.locals.cost = round(cost);
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