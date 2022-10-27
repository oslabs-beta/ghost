import * as React from 'react'
import { useFunctionContext } from '../context/FunctionContext'
import { Box, Typography, styled, Button, Slider, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel, TextField  } from '@mui/material'

interface PricingDetailsProps {
  defaultFunctionConfig: any,
}

const PricingDetails = ({ defaultFunctionConfig }: any) => {
  const { functionName } = useFunctionContext();
  const [type, setType] = React.useState('x86_64');
  const [memorySize, setMemorySize] = React.useState(128);
  const [storage, setStorage] = React.useState(512);
  const [billedDurationAvg, setBilledDurationAvg] = React.useState(1);
  const [invocationsTotal, setInvocationsTotal] = React.useState(1);
  const [pricing, setPricing] = React.useState(0);
  const [showPricing, setShowPricing] = React.useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // post request to backend
    const body = {
      functionName: functionName,
      type: type,
      memorySize: memorySize,
      storage: storage,
      billedDurationAvg: billedDurationAvg,
      invocationsTotal: invocationsTotal
    }
    fetch('http://localhost:3000/price', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
      })
      .then((res) => res.json())
      .then((data) => {
        setPricing(data);
        setShowPricing(true);
        })
        .catch((err) => {
          console.log('Error fetching metrics:', err);
        });
  }

  const financial = (num: any) => {
    return Number.parseFloat(num).toFixed(2);
  }

  const PrettoSlider = styled(Slider)({
    color: '#87c78a',
    height: 8,
    width: 700, 
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#B2CAB3',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });


  return (
    <div className='p-5 flex flex-col text-gray-700 dark:text-[#D3D4D4]'>
      <p className='text-gray-700 dark:text-[#D3D4D4] text-lg'>Viewing price calculator for:</p>
      <p className='text-gray-900 dark:text-[#D3D4D4] text-4xl mb-2.5'>{functionName}</p>
      <p className='text-gray-700 dark:text-[#D3D4D4] text-md mt-10'>Configure your function below to estimate how much it will cost you per month.</p>

      <br></br>
      
      <FormControl sx={{m: 3}}>
      <Typography gutterBottom>Type:</Typography>
      <RadioGroup
        aria-labelledby="Type"
        defaultValue="ARM"
        name="radio-buttons-group"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <FormControlLabel value="ARM" control={<Radio sx={{
          '&, &.Mui-checked': {
            color: '#7f9f80',
          },
        }}/>} label="ARM" />
        
        <FormControlLabel value="x86_64" control={<Radio sx={{
          '&, &.Mui-checked': {
            color: '#7f9f80',
          },
        }}/>} label="x86_64" />

      </RadioGroup>
    </FormControl>

    <Box sx={{ width: '100%', m: 3 }}>
    <Box sx={{ m: 3 }} />
      <Typography gutterBottom>Memory Size (MB):</Typography>
      <PrettoSlider 
        valueLabelDisplay="auto"
        value={memorySize}
        aria-label="pretto slider"
        defaultValue={20}
        step={200}
        marks
        min={130}
        max={10240}
        onChange={(e, value) => setMemorySize(value as number)}
      />

    <Box sx={{ m: 3 }} />
      <Typography gutterBottom>Storage Size (MB):</Typography>
      <PrettoSlider 
        valueLabelDisplay="auto"
        value={storage}
        aria-label="pretto slider"
        defaultValue={20}
        step={200}
        marks
        min={520}
        max={10240}
        onChange={(e, value) => setStorage(value as number)}
      />

    <Box sx={{ m: 3 }} />
      <Typography gutterBottom>Billed Duration:</Typography>
      <PrettoSlider 
        valueLabelDisplay="auto"
        value={billedDurationAvg}
        aria-label="pretto slider"
        step={1000}
        marks
        min={1}
        max={90000}
        onChange={(e, value) => setBilledDurationAvg(value as number)}
      />

    <Box sx={{ m: 3 }} />
      <Typography gutterBottom>Total Invocations:</Typography>
      <PrettoSlider 
        valueLabelDisplay="auto"
        value={invocationsTotal}
        aria-label="pretto slider"
        step={100}
        marks
        min={1}
        max={9999}
        onChange={(e, value) => setInvocationsTotal(value as number)}
      />
    
    </Box>

    <div className="flex w-11/12">
      <Button className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
        variant="outlined"
        disableElevation
        sx={{
          width: '20%',
          m: 2.7, 
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
        onClick={handleSubmit}
          >Calculate Price
      </Button>

      {showPricing && (
        <p className='text-gray-700 dark:text-[#D3D4D4] mt-3.5 text-4xl'>${financial(pricing)}</p>
      )}
    </div>

    </div>
  )
}

export default PricingDetails

//req.body will have these props:
  //type: "x86_64" or "Arm"
  //memorySize: 128 //must be b/w 128 and 10240 (10gb)
  //storage: 512 (number) //must be between 512 to 10240
  //billedDurationAvg: Number //must be b/w 1 to 900000
  //invocationsTotal: Number //must be b/w 1 to 1e+21

/* 


// SCATTER PLOT
<p className=" bg-white rounded-lg shadow-md m-2 p-4">
  <Scatter
    data = { scatterState }
    options = {{
      plugins: {
        title: {
          display: true,
          font: {
            weight: 'bold',
            size: 30,
            },
          text: 'Scatter Plot Title',
          color: '#BEBEBE',
          align: 'start',
          padding: {
            top: 20,
            bottom: 20
            }
          },
        legend: {
          display: false,
          position: 'right'
          }
        }
    }}
  />
</p>

// DOUBLE LINE GRAPH STATE
  const multiState = {
    labels: timestamps,
    datasets: [
      {
        label: 'Memory Used',
        data: memory,
        borderColor: '#B2CAB3',
        backgroundColor: '#B2CAB3',
      },
      {
        label: 'Duration',
        data: durations,
        borderColor: '#B8E8FC',
        backgroundColor: '#B8E8FC',
      }
    ]
  }


// DOUBLE LINE GRAPH
<p className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white">
      <Line
        data = { multiState }
        options = {{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 25,
              },
              text: 'Basic Metrics',
              color: '#bfbfbf',
              align: 'start',
              padding: {
                top: 20,
                bottom: 20
              }
            }
          },
          scales: {
            y: {
              ticks: { color: '#bfbfbf' },
              title: {
                display: true,
                text: 'seconds',
                color: '#bfbfbf'
              }
            },
            x: {
              ticks: { color: '#bfbfbf' },
              title: {
                display: true,
                text: 'time',
                color: '#bfbfbf'
              }
            }
          },
        }}/>
      </p>


*/



