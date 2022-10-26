import * as React from 'react'
// import * as Logo from '../images/ghost.PNG'
import Button from '@mui/material/Button';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import AddchartIcon from '@mui/icons-material/Addchart';
import { useDarkMode } from '../context/DarkModeHooks';
import { useGraphContext } from '../context/GraphContext';

interface TopBarProps {
  changeMuiTheme: () => void;
}


const TopBarContainer = ({ changeMuiTheme }: TopBarProps) => {

  const [isDark, setIsDark] = useDarkMode()
  const toggleDarkMode = (checked: boolean) => {
    // setMode(checked ? "dark" : "light");
    setIsDark(checked)
    changeMuiTheme()
  };

  const { createGraphIsShown, setCreateGraphIsShown } = useGraphContext()
  const handleCreateGraph = () => {
    setCreateGraphIsShown?.(!createGraphIsShown)
  }

  return (
    <div className='flex flex-row justify-around absolute top-5 right-0 w-fit'> {/* align the two divz */}
    
    <div className='mr-1'>
      <Button 
        sx = {{
        height: '30px',
        fontSize: 10,
        color: "#FFFFFF",
        backgroundColor: "#EDC09E",
        borderColor: "#EDC09E",
        mr: 0.4,
        mt: 0.45
        }}
        onClick={handleCreateGraph}
      >
        <AddchartIcon 
        sx = {{
          mr: 1
        }}/>
        Create Graph
      </Button>
    </div>
    
    <div className='mr-1'>
      <Button
        sx = {{
          height: '30px',
          // minwidth: '10px',
          // maxwidth: '10px',
          backgroundColor: '#BFBFBF',
          mt: 0.45
        }}> {/* need to style the div so that it looked like the button from before... */}
        <DarkModeSwitch
          style={{ 
            marginBottom: '1rem',
            marginTop: '1rem' }} // can take this out or change
          checked={isDark}
          onChange={toggleDarkMode}
          size={25}
        />
        </Button>
    </div>

    
      <div className='mr-1'>
      <img src='https://i.postimg.cc/zf8ZDycV/ghost.png' className='object-cover mr-0.5 h-12'/>
      </div>
    </div>
  )
}

export default TopBarContainer;