const { LambdaClient, ListFunctionsCommand } = require("@aws-sdk/client-lambda");

const lambdaController = {};

lambdaController.getFunctions = (req, res, next) => {
  const client = new LambdaClient({ region: "us-west-1" }); //req.body.region (object with key/value pair)

  const input = {};

  const command = new ListFunctionsCommand(input);

  client.send(command)
    .then(data => {
      const functions = data.Functions.map(fnObj => {
        const funcData = {};
        funcData.functionName = fnObj.FunctionName;
        funcData.functionARN = fnObj.FunctionArn;
        return funcData
      })
      res.locals.functions = functions;
      return next();
    })
    .catch(err => {
      console.log('error in getFunctions: ', err)
      return next('error in lambda.getFunctions')
    })

}



module.exports = lambdaController;