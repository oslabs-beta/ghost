import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import MainContainer from './container/mainContainer';
import LeftContainer from './container/leftContainer';

const App = () => {
  return (
    <div className="flex flex-row">
      <LeftContainer />
      <MainContainer />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('app'));