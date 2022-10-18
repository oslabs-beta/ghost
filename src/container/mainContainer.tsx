import * as React from 'react'
import * as ReactDOM from 'react-dom'

import LeftContainer from './leftContainer'
import MidContainer from './midContainer'
import RightContainer from './rightContainer'

const MainContainer = () => {
  return (
    <div>
      <LeftContainer />
      <MidContainer />
      <RightContainer />
    </div>
  )
}

export default MainContainer;