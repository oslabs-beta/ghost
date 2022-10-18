import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MainContainer from './container/mainContainer';

const App = () => {
  return (
    <div>
      <MainContainer />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('app'));