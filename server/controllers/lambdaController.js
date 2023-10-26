const {
  LambdaClient,
  ListFunctionsCommand,
  GetFunctionConfigurationCommand,
  GetPolicyCommand,
  AddPermissionCommand,
  RemovePermissionCommand,
} = require('@aws-sdk/client-lambda');
const regionController = require('./regionController');

const lambdaController = {};

lambdaController.getFunctions = (req, res, next) => {
  const client = new LambdaClient(regionController.currentRegion);

  const input = {};

  const command = new ListFunctionsCommand(input);

  client
    .send(command)
    .then((data) => {
      const functions = data.Functions.map((fnObj) => {
        const funcData = {};
        funcData.functionName = fnObj.FunctionName;
        funcData.functionARN = fnObj.FunctionArn;
        return funcData;
      });
      res.locals.functions = functions;
      return next();
    })
    .catch((err) => {
      console.log('error in getFunctions: ', err);
      return next(err);
    });
};

lambdaController.functionConfig = (req, res, next) => {
  const client = new LambdaClient(regionController.currentRegion);

  const input = {
    FunctionName: req.body.functionName,
  };

  const command = new GetFunctionConfigurationCommand(input);

  client
    .send(command)
    .then((data) => {
      res.locals.functionConfig = {
        type: data.Architectures[0],
        memorySize: data.MemorySize,
        storage: data.EphemeralStorage.Size,
        runtime: data.Runtime,
      };
      return next();
    })
    .catch((err) => {
      console.log('error in functionConfig: ', err);
      return next(err);
    });
};

lambdaController.getPolicies = (req, res, next) => {
  const client = new LambdaClient(regionController.currentRegion);

  const input = {
    FunctionName: req.body.functionName,
  };

  const command = new GetPolicyCommand(input);
  // hover on principal explains that principle represents the services, arns, etc that have permissions to use your lambda function
  client
    .send(command)
    .then((data) => {
      const policies = JSON.parse(data.Policy).Statement.map((policyObj) => {
        const policyData = {
          statementId: policyObj.Sid,
          action: policyObj.Action,
          resource: policyObj.Resource,
        };
        if (typeof policyObj.Principal === 'object') {
          for (const key in policyObj.Principal) {
            policyData.principal = policyObj.Principal[key];
          }
        } else {
          policyData.principal = policyObj.Principal;
        }
        if (policyObj?.Condition?.StringEquals?.['aws:PrincipalOrgID']) {
          policyData.principalOrgId =
            policyObj.Condition.StringEquals['aws:PrincipalOrgID'];
        }

        return policyData;
      });
      res.locals.policies = policies;
      return next();
    })
    .catch((err) => {
      console.log('error in getPolicies: ', err);
      return next(err);
    });
};

lambdaController.addPermission = (req, res, next) => {
  const client = new LambdaClient(regionController.currentRegion);

  const input = {
    Action: req.body.action,
    FunctionName: req.body.functionName,
    Principal: req.body.principal,
    StatementId: req.body.statementId,
  };

  req.body.principalOrgId
    ? (input.PrincipalOrgID = req.body.principalOrgId)
    : null;

  const command = new AddPermissionCommand(input);

  client
    .send(command)
    .then((data) => {
      res.locals.addedPermission = data;
      return next();
    })
    .catch((err) => {
      console.log('error in addPermissions: ', err);
      return next(err);
    });
};

lambdaController.removePermission = (req, res, next) => {
  const client = new LambdaClient(regionController.currentRegion);

  const input = {
    FunctionName: req.body.functionName,
    StatementId: req.body.statementId,
  };

  const command = new RemovePermissionCommand(input);

  client
    .send(command)
    .then((data) => {
      res.locals.removedPermission = data;
      return next();
    })
    .catch((err) => {
      console.log('error in removePermissions: ', err);
      return next(err);
    });
};

module.exports = lambdaController;
