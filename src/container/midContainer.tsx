import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MidTopContainer from './midTopContainer'
import MidBottomContainer from './midBottomContainer'

const MidContainer =  ()  =>  {
  return (
    <div>mid container
      <MidTopContainer />
      <MidBottomContainer />
    </div>
  )
}

export default MidContainer;