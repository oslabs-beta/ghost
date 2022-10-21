import * as React from 'react';
import Button from '@mui/material/Button';
import FunctionContext from '../context/FunctionContext';

// pass down lambdaFuncList by declaring it as interface first
interface Props {
  list: any; // TODO: refactor to correct type, 'any' works for now but probably not best practice
}
const LambdaFuncList: React.FC<Props> = ({ list }) => {
    // when a lambda function is clicked, set the function name in global context
  // const { functionName, setFunctionName } = React.useContext(FunctionContext);
  const handleLambdaFuncClick = (funcName: string) => {
    console.log('clicked lambda function:', funcName);
  }
  return (
    <div className='bg-[#ebebeb]'>
      {list.map(function(item: any) {
        return (
          <div className="px-5 py-3 hover:shadow-inner">
            <p className="text-bold">{item.functionName}</p>
            <p className="text-xs text-gray-500">{item.functionARN}</p>
            <div className="flex flex-row justify-center mt-2">
            <Button
              variant="outlined"
              disableElevation
              sx={{
                backgroundColor: "#9cb59d",
                borderColor: "#9cb59d",
                color: "#FFFFFF",
                '&:hover': {
                  borderColor: '#9cb59d',
                  backgroundColor: '#F5F5F5',
                  color: '#9cb59d'
                }
              }}
              size="small"
              onClick={() => {
                handleLambdaFuncClick(item.functionName);
              }}
            >
              more info
            </Button>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default LambdaFuncList;