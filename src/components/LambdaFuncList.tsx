import * as React from 'react';
import LambdaFuncComponent from './LambdaFuncComponent';

// pass down list of lambda functions
interface Props {
  list: object[];
}

const LambdaFuncList: React.FC<Props> = ({ list }) => (
  <div className="bg-[#ebebeb] dark:bg-[#313131]">
    {list.map((func: any, index: number) => (
      <LambdaFuncComponent func={func} key={index} />
    ))}
  </div>
);

export default LambdaFuncList;
