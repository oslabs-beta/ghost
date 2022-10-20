import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import MainContainer from './container/mainContainer';
import LeftContainer from './container/leftContainer';
import TestSideBar from './container/TestSidebar';
import MenuPopupState from './container/testSide2';

const App = () => {
  return (
    <div className="flex flex-row">
      {/* <LeftContainer /> */}
      <TestSideBar />
      {/* <MenuPopupState /> */}
      <MainContainer />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('app'));