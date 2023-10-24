import * as React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useGraphContext } from '../context/GraphContext';
import { useFunctionContext } from '../context/FunctionContext';

// pass down lambdaFuncList by declaring it as interface first
interface Props {
  func: any;
}

const LambdaFuncComponent: React.FC<Props> = ({ func }) => {
  // when a function is clicked, set the function in context
  const {
    setFunctionName,
    setIsMetricsEnabled,
    setIsPricingEnabled,
    setIsHomeEnabled,
    setIsPermissionsEnabled,
    setShowPricing,
    setShowHistory,
  } = useFunctionContext();
  const { setCreateGraphIsShown } = useGraphContext();
  const [openOptions, setOpenOptions] = React.useState(false);
  const handleOpenOptions = () => {
    setOpenOptions(!openOptions);
  };

  const handleMetricsClick = (funcName: string) => {
    setFunctionName?.(funcName);
    setIsMetricsEnabled?.(true);
    setIsPricingEnabled?.(false);
    setIsHomeEnabled?.(false);
    setCreateGraphIsShown?.(false);
    setIsPermissionsEnabled?.(false);
  };
  const handlePricingClick = (funcName: string) => {
    setFunctionName?.(funcName);
    setIsPricingEnabled?.(true);
    setIsMetricsEnabled?.(false);
    setIsHomeEnabled?.(false);
    setCreateGraphIsShown?.(false);
    setIsPermissionsEnabled?.(false);
    setShowPricing?.(false);
    setShowHistory?.(false);
  };

  const handlePermissionsClick = (funcName: string) => {
    setFunctionName?.(funcName);
    setIsPricingEnabled?.(false);
    setIsMetricsEnabled?.(false);
    setIsHomeEnabled?.(false);
    setCreateGraphIsShown?.(false);
    setIsPermissionsEnabled?.(true);
  };

  return (
    <div className="hover:shadow-inner break-words">
      <List>
        <ListItem id={func.functionName} key={func.functionName} disablePadding>
          <ListItemButton onClick={handleOpenOptions}>
            <ListItemText
              primary={func.functionName}
              secondary={func.functionARN}
              sx={{
                fontWeight: 'bold',
              }}
            />
            {openOptions ? (
              <ExpandLess fontSize="small" />
            ) : (
              <ExpandMore fontSize="small" />
            )}
          </ListItemButton>
        </ListItem>
      </List>

      {openOptions && (
        <div className="flex flex-col mt-0 items-center">
          <Button
            className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
            variant="outlined"
            disableElevation
            sx={{
              width: '95%',
              backgroundColor: '#9cb59d',
              borderColor: '#9cb59d',
              color: '#FFFFFF',
              '&:hover': {
                borderColor: '#9cb59d',
                backgroundColor: '#F5F5F5',
                color: '#9cb59d',
              },
            }}
            size="small"
            onClick={() => {
              handleMetricsClick(func.functionName);
            }}
          >
            Metrics
          </Button>
          <Button
            className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
            variant="outlined"
            disableElevation
            sx={{
              width: '95%',
              mt: 1,
              backgroundColor: '#9cb59d',
              borderColor: '#9cb59d',
              color: '#FFFFFF',
              '&:hover': {
                borderColor: '#9cb59d',
                backgroundColor: '#F5F5F5',
                color: '#9cb59d',
              },
            }}
            size="small"
            onClick={() => {
              handlePricingClick(func.functionName);
            }}
          >
            Pricing
          </Button>
          <Button
            className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
            variant="outlined"
            disableElevation
            sx={{
              width: '95%',
              mt: 1,
              backgroundColor: '#9cb59d',
              borderColor: '#9cb59d',
              color: '#FFFFFF',
              '&:hover': {
                borderColor: '#9cb59d',
                backgroundColor: '#F5F5F5',
                color: '#9cb59d',
              },
            }}
            size="small"
            onClick={() => {
              handlePermissionsClick(func.functionName);
            }}
          >
            Permissions
          </Button>
        </div>
      )}
    </div>
  );
};

export default LambdaFuncComponent;
