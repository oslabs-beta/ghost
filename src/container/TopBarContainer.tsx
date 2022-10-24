import * as React from 'react'
// import * as Logo from '../images/ghost.PNG'
import Button from '@mui/material/Button';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const TopBarContainer = () => {
  return (
    <div className='flex justify-around absolute top-5 right-0'>
      <Button 
        sx = {{
        maxHeight: '30px',
        maxWidth: '30px',
        minHeight: '30px',
        minWidth: '30px',
        color: "#9cb59d",
        backgroundColor: "white",
        borderColor: "#white",
        m: 0.4
        // borderRadius: '50%'
        }}
      > 
        <NightsStayIcon /> 
        {/* dark mode */}
      </Button>

      <Button 
        sx = {{
        height: '30px',
        fontSize: 10,
        color: "#FFFFFF",
        backgroundColor: "#EDC09E",
        borderColor: "#EDC09E",
        m: 0.4
        }}
      >
        <QueryStatsIcon />
        Create Graph
      </Button>
      <img src='https://i.postimg.cc/zf8ZDycV/ghost.png' className='object-cover mr-0.5 h-12'/>
    </div>
  )
}

export default TopBarContainer;