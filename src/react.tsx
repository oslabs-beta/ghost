import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import MainContainer from './container/mainContainer';
import SidebarContainer from './container/SidebarContainer';
import FunctionContextProvider from './context/FunctionContext';
import TopBarContainer from './container/TopBarContainer';
import { useState } from "react";
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { Container, CssBaseline, Switch, Typography, ThemeOptions } from "@mui/material";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const theme = useTheme();

  const themeOptions: ThemeOptions = {
    palette: {
      mode: 'light',
      primary: {
        main: '#9cb59d',
        light: '#B2CAB3',
      },
      secondary: {
        main: '#EDC09E',
      },
      background: {
        default: '#D9D9D9',
        paper: '#bebebe',
      },
    },
  };


  //  const themeOptions: ThemeOptions = {
  //   palette: {
  //     mode: 'dark',
  //     primary: {
  //       main: '#B2CAB3',
  //       light: '#B2CAB3',
  //     },
  //     secondary: {
  //       main: '#FDFDBD',
  //     },
  //     background: {
  //       default: '#1c1c1c',
  //       paper: '#484848',
  //     },
  //   },
  // };



  // const selectedTheme = mode === "dark" ? theme : lightTheme;



  return (
    <ThemeProvider theme ={theme}>
      <CssBaseline />
    <div className="flex flex-row">
      <FunctionContextProvider>
        <TopBarContainer setMode={setMode} />
        <SidebarContainer />
        <MainContainer />
      </FunctionContextProvider>
    </div>
    </ThemeProvider>
  )
};

ReactDOM.render(<App />, document.getElementById('app'));