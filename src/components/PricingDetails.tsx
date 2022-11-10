import * as React from 'react'
import { useFunctionContext } from '../context/FunctionContext'
import { Box, Slider, Typography, styled, Button, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel, TextField, FormHelperText, Select, Tabs, Tab, Stack } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useMainPageContext } from '../context/MainPageContext';
import PriceLoader from './PriceLoader';
import * as dayjs from 'dayjs';

interface PricingDetailsProps {
  defaultFunctionConfig: any,
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StyledTab = styled(Tab)({
  "&.Mui-selected": {
    color: "#7f9f80"
  }
})

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PricingDetails = ({ defaultFunctionConfig }: PricingDetailsProps) => {
  const { functionName, showPricing, setShowPricing, showHistory, setShowHistory } = useFunctionContext();
  const { priceLoading, setPriceLoading } = useMainPageContext();
  const [type, setType] = React.useState(defaultFunctionConfig.type);
  const [memorySize, setMemorySize] = React.useState(defaultFunctionConfig.memorySize);
  const [storage, setStorage] = React.useState(defaultFunctionConfig.storage);
  const [billedDurationAvg, setBilledDurationAvg] = React.useState(1);
  const [invocationsTotal, setInvocationsTotal] = React.useState(1);
  const [pricing, setPricing] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [displayDate, setDisplayDate] = React.useState('');
  const [priceHistory, setPriceHistory] = React.useState<any>([]);
  // const [showHistory, setShowHistory] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCalcSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setShowPricing?.(false);
    // post request to backend for pricing calculator
    const body = {
      functionName: functionName,
      type: type,
      memorySize: memorySize,
      storage: storage,
      billedDurationAvg: billedDurationAvg,
      invocationsTotal: invocationsTotal
    }
    fetch('http://localhost:3000/price/calc', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
      })
      .then((res) => res.json())
      .then((data) => {
        setPricing(data);
        setShowPricing?.(true);
        })
        .catch((err) => {
          console.log('Error fetching pricing calc:', err);
        });
  }

  const handleHistorySubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // turn off showing the price history if it was previously calculated
    setShowHistory?.(false);
    // turn on loading animation
    setPriceLoading?.(true);
    // post request to backend for pricing history
    setDisplayDate(dayjs(date).format('MMMM YYYY'));
    fetch('http://localhost:3000/price/history', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        functionName: functionName,
        date: dayjs(date).format('YYYY/MM/')
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setPriceHistory(data);
        setPriceLoading?.(false);
        setShowHistory?.(true);
      })
      .catch((err) => {
          console.log('Error fetching pricing history:', err);
      });
  }

  // convert returned number to currency
  const financial = (num: any) => {
    return new Intl.NumberFormat().format(num);
  }

  return (
    <div className='p-5 flex flex-col text-gray-900 dark:text-[#D3D4D4]'>

      {/* PRICING CALCULATOR */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 5 }}>
        <Tabs 
          TabIndicatorProps={{style: {background: '#7f9f80'}}}
          value={value}
          onChange={handleChange}>
          <StyledTab label="CALCULATOR" {...a11yProps(0)} />
          <StyledTab label="HISTORY" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <p className='text-gray-700 dark:text-[#D3D4D4] text-lg'>Viewing price calculator for:</p>
      <p className='text-gray-900 dark:text-[#D3D4D4] text-4xl mb-2.5 font-bold'>{functionName}</p>
      <p className='text-gray-700 dark:text-[#D3D4D4] text-md mt-10'>
        Configure your function below to estimate how much it will cost you per month.
        <br></br>
        The default values are your function's current configuration.
      </p>

      <br></br>
    
    <Box sx={{ width: '70%', my: 3 }}>
    <FormControl>
      <Typography gutterBottom>Type:</Typography>
      <RadioGroup
        aria-labelledby="Type"
        defaultValue="Arm"
        name="radio-buttons-group"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <FormControlLabel value="Arm" control={<Radio sx={{
          '&, &.Mui-checked': {
            color: '#7f9f80',
          },
        }}/>} label="Arm" 
        />
        <FormControlLabel value="x86_64" control={<Radio sx={{
          '&, &.Mui-checked': {
            color: '#7f9f80',
          },
        }}/>} label="x86_64" 
        />
      </RadioGroup>
    </FormControl>

    <Box sx={{ my: 3 }} />
      <Typography gutterBottom>Memory Size (MB):</Typography>
      <Slider 
        sx={{color:"#9cb59d"}}
        aria-label="default"
        valueLabelDisplay="auto"
        value={memorySize}
        min={128}
        max={10240}
        onChange={(e, value) => setMemorySize(value as number)}
      />

    <Box sx={{ msScrollLimitYMax: 3 }} />
      <Typography gutterBottom>Storage Size (MB):</Typography>
      <Slider 
        sx={{color:"#9cb59d"}}
        aria-label="default"
        valueLabelDisplay="auto"
        value={storage}
        min={512}
        max={10240}
        onChange={(e, value) => setStorage(value as number)}
      />

    <Box sx={{ my: 3 }} />
      <Typography gutterBottom>Billed Duration:</Typography>
      <Slider 
        sx={{color:"#9cb59d"}}
        aria-label="default"
        valueLabelDisplay="auto"
        value={billedDurationAvg}
        min={1}
        max={90000}
        onChange={(e, value) => setBilledDurationAvg(value as number)}
      />

    <Box sx={{ my: 3 }} />
      <Typography gutterBottom>Total Invocations:</Typography>
      <TextField 
        type="number"
        className="w-auto" 
        id="outlined-basic" 
        value={invocationsTotal} 
        placeholder="100000000000" 
        variant="outlined" 
        onChange={(e) => setInvocationsTotal(Number(e.target.value))
        } 
      />
    </Box> 

    <div className="flex w-11/12 my-3">
      <Button className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
        variant="outlined"
        disableElevation
        sx={{
          width: '20%', 
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
        onClick={handleCalcSubmit}
          >CALCULATE PRICE
      </Button>
      <p className='ml-4'>
      {showPricing && (
        <p className='text-gray-700 dark:text-[#D3D4D4] text-4xl font-bold'> ${financial(pricing)} </p>
      )}
      </p>
    </div>
    </TabPanel>


    {/* PRICING HISTORY */}
    <TabPanel value={value} index={1}>
      <p className='text-gray-700 dark:text-[#D3D4D4] text-lg'>Viewing price history for:</p>
      <p className='text-gray-900 dark:text-[#D3D4D4] text-4xl mb-2.5 font-bold'>{functionName}</p>
      <br></br>

      <Box sx={{ width: '30%'}}>
      <Typography sx={{mb:3}} gutterBottom>Billed month:</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DatePicker
          views={['year', 'month']}
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </Stack>
    </LocalizationProvider>
    <br></br>

    <div className="flex w-11/12">
      <Button className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
        variant="outlined"
        disableElevation
        sx={{
          width: '30%',
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
        onClick={handleHistorySubmit}
        >SUBMIT
      </Button>
      </div>
      </Box>
      <br></br>

      {priceLoading ? <PriceLoader /> : showHistory && (
      <div>
        <p className='text-gray-700 dark:text-[#D3D4D4] mt-3.5 text-xl'>Your total costs for {displayDate} were:</p>
        <p className='text-gray-700 dark:text-[#D3D4D4] mt-3.5 text-4xl font-bold'>${financial(priceHistory)}</p>
      </div>
      )}
      </TabPanel>
  </div>
  )
}

export default PricingDetails