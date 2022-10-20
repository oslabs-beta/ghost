import * as React from 'react';
import Button from '@mui/material/Button';

// pass down lambdaFuncList by declaring it as interface first
interface Props {
  list: any; // TODO: refactor to correct type, 'any' works for now but probably not best practice
}

const LambdaFuncList: React.FC<Props> = ({ list }) => {
  return (
    <div>
      {list.map(function(item: any) {
        return (
          <div className="px-5 py-3 hover:shadow-inner">
            <p className="text-bold">{item.functionName}</p>
            <p className="text-xs text-gray-500">{item.functionARN}</p>
            <div className="flex flex-row justify-center mt-2">
            <Button
              variant="outlined"
              disableElevation
              size="small"
              onClick={() => {
                alert('hi');
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