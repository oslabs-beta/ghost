import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import UserComponent from '../components/UserComponent';
import RegionComponent from '../components/RegionComponent';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LambdaFuncList from '../components/LambdaFuncList';
import { useFunctionContext } from '../context/FunctionContext';

const drawerWidth = 255;

export default function SidebarContainer() {
  // opens the menu drawers on click & changes the color
  const [openMenu, setOpenMenu] = React.useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
    (!openMenu) ? document.querySelector('#list-select')?.classList.add('bg-[#B2CAB3]') : document.querySelector('#list-select')?.classList.remove('bg-[#B2CAB3]');
    }
  
  // home sends you to the home page
  const { setFunctionName } = useFunctionContext();
  const handleHomeClick = () => {
    setFunctionName?.('');
  }

  // fetch list of lambda functions
  // TODO: store in global context
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
    <div className='bg-[#F5F5F5] text-black dark:bg-[#242424] dark:text-white'>
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          p: 2,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'transparent',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        
        <div className='pt-5 flex justify-around '>
          <UserComponent />
          <RegionComponent />
        </div>

        <List>
          {['Home'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <List id='list-select'>
          {['Your Lambda Functions'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={handleOpenMenu}>
                <ListItemText
                  primary={text}
                  sx={{
                    fontWeight: 'bold'
                  }}
                />
                {openMenu ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {openMenu && <LambdaFuncList list={lambdaFuncList} />}

        <List 
        sx={{ 
          fontSize: 34, 
          fontWeight: 'bold'
          }}
        >
          {['Metrics'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <List 
        sx={{ 
          // color: 'text.primary', 
          fontSize: 40, 
          fontWeight: 'bold'
          }}
        >
          {['Pricing'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

      </Drawer>
    </Box>
    </div>
  );
}
