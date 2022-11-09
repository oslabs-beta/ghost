const { cloudwatchController } = require('../controllers/cloudwatchController');

describe('testing cloudwatch controller', () => {
  it('should throw 400 error if logGroupName is invalid', () => {
    const treq = {
      logGroupName: "/aws/lambd/akashhastwoapples",
      descending: true,
    };
    
  })
  // it('testing cloudwatchController.getRawLogs', () => {
  //   const res = 
  // })
  // it('testing cloudwatchController.getAllLogStreams', () => {
  //   const res = 
  // })
  // it('testing cloudwatchController.getAllRawLogs', () => {
  //   const res = 
  // })
});
// describe('cloudwatchController', function() {

// })
// cloudwatchController.getLogStreams = (req, res, next) => {

// }

// cloudwatchController.getRawLogs = (req, res, next) => {

// }

// cloudwatchController.getAllLogStreams = async (req, res, next) => {

// }

// cloudwatchController.getAllRawLogs = async (req, res, next) => {

// }