import * as React from 'react';
import Button from '@mui/material/Button';
import { useFunctionContext } from '../context/FunctionContext';

// pass down lambdaFuncList by declaring it as interface first
interface Props {
  list: Array<object>;
}

const LambdaFuncList: React.FC<Props> = ({ list }) => {
  // when a function is clicked, set the function in context
  const { setFunctionName } = useFunctionContext();
  const handleLambdaFuncClick = (funcName: string) => {
    setFunctionName?.(funcName);
  }
  return (
    <div className='bg-[#ebebeb] dark:bg-[#313131]'>
      {list.map(function(item: any) { // when i change this to object, it breaks
        return (
          <div className="px-5 py-3 hover:shadow-inner">
            <p className="text-bold">{item.functionName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-200 break-words">{item.functionARN}</p>
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