import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import MainContainer from './container/mainContainer';
import SidebarContainer from './container/TestSidebar';

const App = () => {
  return (
    <div className="flex flex-row">
      <SidebarContainer />
      <MainContainer />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('app'));