import * as React from 'react';
import * as ReactDOM from 'react-dom';

import RightTopContainer from './rightTopContainer';
import RightBottomContainer from './rightBottomContainer';

const RightContainer =  ()  =>  {
  return (
    <div>right container
      <RightTopContainer />
      <RightBottomContainer />
    </div>
  )
}

export default RightContainer;