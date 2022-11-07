const { LambdaClient, ListFunctionsCommand, GetFunctionConfigurationCommand, GetPolicyCommand, AddPermissionCommand } = require("@aws-sdk/client-lambda");

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

lambdaController.functionConfig = (req, res, next) => {
  const client = new LambdaClient({ region: "us-west-1" });

  const input = {
    "FunctionName": req.body.functionName
  };

  const command = new GetFunctionConfigurationCommand(input);

  client.send(command)
    .then(data => {
      res.locals.functionConfig = {
        type: data.Architectures[0], 
        memorySize: data.MemorySize,
        storage: data.EphemeralStorage.Size,
        runtime: data.Runtime
      };
      next();
    })
    .catch(err => {
      console.log('error in functionConfig: ', err)
      return next('error in lambda.functionConfig')
    })
}

lambdaController.getPolicies = (req, res, next) => {
  const client = new LambdaClient({ region: "us-west-1" });

  const input = {
    "FunctionName": req.body.functionName
  };

  const command = new GetPolicyCommand(input);
  //hover on principal explains that principle represents the services, arns, etc that have permissions to use your lambda function
  client.send(command)
    .then(data => {
      const policies = JSON.parse(data.Policy).Statement.map(policyObj => {
        const policyData = {
          statementId: policyObj.Sid,
          action: policyObj.Action,
          resource: policyObj.Resource,
        }
        if (typeof policyObj.Principal === "object") {
          for (const key in policyObj.Principal) {
            policyData.principal = policyObj.Principal[key]
          }
        } else {
          policyData.principal = policyObj.Principal;
        }
        return policyData
      })
      res.locals.policies = policies
      next();
    })
    .catch(err => {
      console.log('error in getPolicies: ', err)
      return next('error in lambda.getPolicies')
    })
}

lambdaController.addPermission = (req, res, next) => {
  const client = new LambdaClient({ region: "us-west-1" });

  const input = {
    "Action": req.body.action,
    "FunctionName": req.body.functionName,
    "Principal": req.body.principal,
    "StatementId": req.body.statementId
  }

  const command = new AddPermissionCommand(input);

  client.send(command)
    .then(data => {
      res.locals.data = data;
      return next();
    })
    .catch(err => {
      console.log(err)
      return next(err)
    })
}


module.exports = lambdaController;