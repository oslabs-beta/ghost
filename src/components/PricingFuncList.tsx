import * as React from 'react';
import Button from '@mui/material/Button';
import { useFunctionContext } from '../context/FunctionContext';

// do we want this list to show up on the sidebar like the function metrics list, or just go straight to main container?

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
      {list.map(function(item: any) {
        return (
          <div className="px-5 py-3 hover:shadow-inner">
            <p className="text-bold">{item.functionName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-200 break-words">{item.functionARN}</p>
            <div className="flex flex-row justify-center mt-2">
            <Button className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
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
            >
              Show Pricing
            </Button>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default LambdaFuncList;