const validRegions = require('../assets/validRegions');

const regionController = {
  currentRegion: { region: "us-west-1" }
};

regionController.changeRegion = (req, res, next) => {
  try {
    const newRegion = req.body.region;
    if (validRegions.includes(newRegion)) {
      regionController.currentRegion.region = req.body.region
      res.locals.response = 'region changed'
    } else {
      res.locals.response = 'invalid region'
    }
    return next();
  } catch (err) {
    console.log("error in changeRegion", err)
    return next(err)
  }
}

module.exports = regionController;