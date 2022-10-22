import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import MainContainer from './container/mainContainer';
import SidebarContainer from './container/SidebarContainer';
import FunctionContextProvider from './context/FunctionContext';
import TopBarContainer from './container/TopBarContainer';

const App = () => {
  return (
    <div className="flex flex-row">
      <FunctionContextProvider>
        <TopBarContainer />
        <SidebarContainer />
        <MainContainer />
      </FunctionContextProvider>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('app'));