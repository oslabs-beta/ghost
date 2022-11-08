import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const testButton = ({ children }) => {
  const [showButtons, setShowButtons] = React.useState(false);
  const handleShowButtons= () => {
    setShowButtons(!showButtons);
    }

  return (
    <div>
    <ListItemButton>
      { children }
      {showButtons ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>

    {showButtons && 
            <div className="flex flex-col mt-0 items-center">
            <br></br>
            <Button className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
              variant="outlined"
              disableElevation
              sx={{
                width: '95%',
                backgroundColor: "#9cb59d",
                borderColor: "#9cb59d",
                color: "#FFFFFF",
                '&:hover': {
                  borderColor: '#9cb59d',
                  backgroundColor: '#F5F5F5',
                  color: '#9cb59d'
                }
              }}
              size="small"
              onClick={() => {
                handleMetricsClick(item.functionName);
              }}
            >
              Metrics
            </Button>
            <Button className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
              variant="outlined"
              disableElevation
              sx={{
                width: '95%',
                mt: 1,
                backgroundColor: "#9cb59d",
                borderColor: "#9cb59d",
                color: "#FFFFFF",
                '&:hover': {
                  borderColor: '#9cb59d',
                  backgroundColor: '#F5F5F5',
                  color: '#9cb59d'
                }
              }}
              size="small"
              onClick={() => {
                handlePricingClick(item.functionName);
              }}
            >
              Pricing
            </Button>
            <Button className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
              variant="outlined"
              disableElevation
              sx={{
                width: '95%',
                mt: 1,
                backgroundColor: "#9cb59d",
                borderColor: "#9cb59d",
                color: "#FFFFFF",
                '&:hover': {
                  borderColor: '#9cb59d',
                  backgroundColor: '#F5F5F5',
                  color: '#9cb59d'
                }
              }}
              size="small"
              onClick={() => {
                handlePermissionsClick(item.functionName);
              }}
            >
              Permissions
            </Button>
            </div>
          }
    </div>
  )
}

export default testButton