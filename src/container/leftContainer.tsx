import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LeftTopContainer from './leftTopContainer'
import LeftBottomContainer from './leftBottomContainer'

const LeftContainer =  ()  =>  {
  return (
    <div>left container
      <LeftTopContainer />
      <LeftBottomContainer />
    </div>
  )
}

export default LeftContainer;