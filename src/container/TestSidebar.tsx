import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuPopupState from './testSide2';
import { ThemeProvider, createTheme } from '@mui/system';
import LambdaFuncList from '../components/LambdaFuncList';

const drawerWidth = 240;


const theme = createTheme({
  palette: {
    background: {
      basegreen: '#A6D6A8',
    },
    text: {
      primary: '#000000',
      secondary: '#828282',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

interface TestSideBar {
}

export default function PermanentDrawerLeft() {
  // opens the 'your lambda functions' drawer
  const [openFunctionsMenu, setOpenFunctionsMenu] = React.useState(false);
  const handleOpenFunctions = () => {
    setOpenFunctionsMenu(!openFunctionsMenu);
  };

  // fetch list of lambda functions
  const [lambdaFuncList, setLambdaFuncList] = React.useState([]);
  React.useEffect(() => {
    fetch('http://localhost:3000/functions')
      .then((res) => res.json())
      .then((data) => {
        setLambdaFuncList(data);
      })
      .catch((err) => {
        console.log('Error fetching lambda functions:', err);
      }
      );
  }, []);

  return (
    // <ThemeProvider theme = {theme}>
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          bgcolor: 'background.basegreen',
          p: 2,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List className="bg-[#B2CAB3] shadow-md hover:shadow-inner">
          {['Your Lambda Functions:'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={handleOpenFunctions}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* TODO: fetch array of lambda functions, call map method, and display the stuff */}
        {openFunctionsMenu && <LambdaFuncList list={lambdaFuncList} />}
        <Divider />
        <List 
        sx={{ 
          color: 'text.primary', 
          fontSize: 34, 
          fontWeight: 'bold' 
          }}
        >
          {['Pricing', 'Metrics'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

      <MenuPopupState />

      </Drawer>
    </Box>
    // </ThemeProvider>
  );
}
