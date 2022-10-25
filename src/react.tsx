import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import MainContainer from './container/mainContainer';
import SidebarContainer from './container/SidebarContainer';
import FunctionContextProvider from './context/FunctionContext';
import TopBarContainer from './container/TopBarContainer';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const light: any = {
  palette: {
    mode: "light",
  },
};

const dark: any = {
  palette: {
    mode: "dark",
  },
};

const App = () => {
  const [isDarkMui, setIsDarkMui] = React.useState(false);
  const changeMuiTheme = () => {
    setIsDarkMui(!isDarkMui);
  };


  return (
    <div className="flex flex-row">
      <ThemeProvider theme={isDarkMui ? createTheme(dark) : createTheme(light)}>
        <FunctionContextProvider>
          <TopBarContainer changeMuiTheme={changeMuiTheme} />
          <SidebarContainer />
          <MainContainer />
        </FunctionContextProvider>
      </ThemeProvider>
    </div>
  )
};



ReactDOM.render(<App />, document.getElementById('app'));