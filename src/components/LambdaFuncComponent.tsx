import * as React from 'react';
import Button from '@mui/material/Button';
import { useFunctionContext } from '../context/FunctionContext';
import { useGraphContext } from '../context/GraphContext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// pass down lambdaFuncList by declaring it as interface first
interface Props {
  list: Array<object>;
}

const LambdaFuncComponent: React.FC<Props> = ({ list }) => {
  // when a function is clicked, set the function in context
  const { setFunctionName, isMetricsEnabled, setIsMetricsEnabled, isPricingEnabled, setIsPricingEnabled, isHomeEnabled, setIsHomeEnabled, isPermissionsEnabled, setIsPermissionsEnabled } = useFunctionContext();
  const { setCreateGraphIsShown } = useGraphContext();
  const [openOptions, setOpenOptions] = React.useState(false);
  const handleOpenOptions = () => {
    setOpenOptions(!openOptions);
    // setCurrFunc(funcName);
    // (!openOptions) ? document.querySelector('#option-select')?.classList.add('bg-[#608261]', 'dark:bg-[#608261]') : document.querySelector('#option-select')?.classList.remove('dark:bg-[#608261]', 'bg-[#B2CAB3]');
    }

  const handleMetricsClick = (funcName: string) => {
    setFunctionName?.(funcName);
    setIsMetricsEnabled?.(true);
    setIsPricingEnabled?.(false);
    setIsHomeEnabled?.(false);
    setCreateGraphIsShown?.(false);
    setIsPermissionsEnabled?.(false);
  }
  const handlePricingClick = (funcName: string) => {
    setFunctionName?.(funcName);
    setIsPricingEnabled?.(true);
    setIsMetricsEnabled?.(false);
    setIsHomeEnabled?.(false);
    setCreateGraphIsShown?.(false);
    setIsPermissionsEnabled?.(false);
  }
  
  const handlePermissionsClick = (funcName: string) => {
    setFunctionName?.(funcName);
    setIsPricingEnabled?.(false);
    setIsMetricsEnabled?.(false);
    setIsHomeEnabled?.(false);
    setCreateGraphIsShown?.(false);
    setIsPermissionsEnabled?.(true);
  }
  
  return (
    <div className='bg-[#ebebeb] dark:bg-[#313131]'>
      {list.map(function(item: any) { // when i change this to object, it breaks
        return (
          <div className="hover:shadow-inner">

          <List id='option-select'>
            {[item].map((text, index) => (
              <ListItem id={text.functionName} key={text.functionName} disablePadding>
                <ListItemButton onClick={handleOpenOptions}>
                  <ListItemText
                    primary={text.functionName}
                    secondary={text.functionARN}
                    sx={{
                      fontWeight: 'bold'
                    }}
                  />
                  {openOptions ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
            
          {openOptions && 
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
        );
      })}
    </div>
  )
}

export default LambdaFuncComponent;