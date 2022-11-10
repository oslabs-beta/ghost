const pricingController = {};

pricingController.getEstimate = (req, res, next) => {
  //req.body will have these props:
  //type: "x86_64" or "Arm"
  //memorySize: 128 //must be b/w 128 and 10240 (10gb)
  //storage: 512 (number) //must be between 512 to 10240
  //billedDurationAvg: Number //must be b/w 1 to 900000
  //invocationsTotal: Number //must be b/w 1 to 1e+21
  console.log(req.body)
  const typeKey = req.body.type || res.locals.functionConfig.type;
  const memKey = req.body.memorySize || res.locals.functionConfig.memorySize;
  const invocations = req.body.invocationsTotal || res.locals.priceMetrics.invocationsTotal;
  const storage = req.body.storage || res.locals.functionConfig.storage; 
  const totalDuration = req.body.billedDurationAvg ? 
    req.body.billedDurationAvg * invocations :
    res.locals.priceMetrics.durationTotal;

  //unit conversions:
  const memoryGb = memKey * 0.0009765625;
  const totalDurationSec = totalDuration * 0.001;
  const storageGb = storage * 0.0009765625; 

  //gb-sec calculation
  let totalGbSec = memoryGb * totalDurationSec

  //inflate history cost for demo
  res.locals.functionConfig ? totalGbSec = totalGbSec * 10000000 : null;



  //calculating cost
  let firstTier;
  let middleTier;
  let lastTier;

  let cost = 0;
  
  function round(num) {
    return Math.round(num * 100) / 100;
  }

  //tier breakdown calculation
  if (typeKey === 'x86_64') {
    if (totalGbSec <= 6000000000) {
      firstTier = totalGbSec; 
    }
    if (6000000000 < totalGbSec && totalGbSec <= 15000000000) {
      firstTier = 6000000000;
      middleTier = totalGbSec - 6000000000;
    }
    if (15000000000 < totalGbSec) {
      firstTier = 6000000000;
      middleTier = 9000000000;
      lastTier = totalGbSec - 15000000000;
    }

    //calc for firstTier
    cost += firstTier * 0.0000166667;
    //calc for middleTier
    if (middleTier) cost += middleTier * 0.0000150000;
    //calc for lastTier
    if (lastTier) cost += lastTier * 0.0000133334;

  } else if (typeKey === 'Arm') {
    if (totalGbSec <= 7500000000) {
      firstTier = totalGbSec;
    }
    if (7500000000 < totalGbSec && totalGbSec <= 18750000000) {
      firstTier = 7500000000;
      middleTier = totalGbSec - 7500000000;
    }
    if (18750000000 < totalGbSec) {
      firstTier = 7500000000;
      middleTier = 11250000000;
      lastTier = totalGbSec - 18750000000;
    }

    //calc for firstTier
    cost += firstTier * 0.0000133334;
    //calc for middleTier
    if (middleTier) cost += middleTier * 0.0000120001;
    //calc for lastTier
    if (lastTier) cost += lastTier * 0.0000106667;
  }

  //add the cost for invocations
  cost += round(invocations * 0.0000002);

  //billable portion of storage

  const storageBill = round(storageGb - 0.5);
  //get total storage
  const storageTotal = round(storageBill * totalDuration);
  //get total cost 
  cost += (storageTotal * 0.000000037) > 0 ? (storageTotal * 0.000000037) : 0;
  
  //respond with cost
  res.locals.cost = round(cost);
  return next();
}

module.exports = pricingController;
