import * as React from 'react'
// import * as Logo from '../images/ghost.PNG'
import Button from '@mui/material/Button';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import AddchartIcon from '@mui/icons-material/Addchart';
import { useDarkMode } from '../context/DarkModeHooks';

interface TopBarProps {
  setMode: (mode: string) => void;
}


const TopBarContainer = ({ setMode }: TopBarProps) => {

  const [isDark, setIsDark] = useDarkMode()
  const toggleDarkMode = (checked: boolean) => {
    setMode(checked ? "dark" : "light");
    setIsDark(checked)
  };


  return (
    <div className='flex flex-row justify-around absolute top-5 right-0'> {/* align the two divz */}
    <div> {/* need to style the div so that it looked like the button from before... */}
      <DarkModeSwitch
        style={{ marginBottom: '2rem' }} // can take this out or change
        checked={isDark}
        onChange={toggleDarkMode}
        size={25}
      />
    </div>
    <div>
      <Button 
        sx = {{
        height: '30px',
        fontSize: 10,
        color: "#FFFFFF",
        backgroundColor: "#EDC09E",
        borderColor: "#EDC09E",
        m: 0.4,
        }}
      >
        <AddchartIcon 
        sx = {{
          mr: 1
        }}/>
        Create Graph
      </Button>
      </div>
      <div>
      <img src='https://i.postimg.cc/zf8ZDycV/ghost.png' className='object-cover mr-0.5 h-12'/>
      </div>
    </div>
  )
}

export default TopBarContainer;