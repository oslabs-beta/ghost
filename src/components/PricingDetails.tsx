import * as React from 'react'
import { useFunctionContext } from '../context/FunctionContext'
import { Box, Typography, styled, Button, Slider, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel, TextField  } from '@mui/material'

interface PricingDetailsProps {
  defaultFunctionConfig: any,
}

const PricingDetails = ({ defaultFunctionConfig }: any) => {
  const { functionName } = useFunctionContext();

  const PrettoSlider = styled(Slider)({
    color: '#87c78a',
    height: 8,
    width: 300, 
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
      
      <br></br>
      
      <FormControl>
      <FormLabel id="Type">Type</FormLabel>
      <RadioGroup
        aria-labelledby="Type"
        defaultValue="ARM"
        name="radio-buttons-group"
      >
        <FormControlLabel value="ARM" control={<Radio />} label="ARM" />
        <FormControlLabel value="X86_64" control={<Radio />} label="X86_64" />
      </RadioGroup>
    </FormControl>

    <Box sx={{ width: '75%' }}>
    <Box sx={{ m: 3 }} />
      <Typography gutterBottom>Memory Size (MB):</Typography>
      <PrettoSlider 
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={20}
        step={200}
        marks
        min={130}
        max={10240}
      />

    <Box sx={{ m: 3 }} />
      <Typography gutterBottom>Storage Size (MB):</Typography>
      <PrettoSlider 
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={20}
        step={200}
        marks
        min={520}
        max={10240}
      />

    <Box sx={{ m: 3 }} />
      <Typography gutterBottom>Billed Duration</Typography>
      <PrettoSlider 
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        step={1000}
        marks
        min={1}
        max={90000}
      />

    <Box sx={{ m: 3 }} />
      <Typography gutterBottom>Total Invocations</Typography>
      <PrettoSlider 
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        step={1000000000000000000}
        marks
        min={1}
        max={1000000000000000000000}
      />
    
    </Box>

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
choose which func to get price data
advanced test > settings for functions (post /functionConfig returns type: string, memorySize: number, runtime: string)
ask if they want to change anything (memorySize 128 - 10240 or type but currently hard coded)
post /price requires functionName, type, memorySize, storage: 512 - 10240: number, billedDurationAvg: 1ms - 900,000ms number, invocationTotal: 1 - 1 21 0's number (default to 1 million ms)
returns $ 20.21 per month
*/

/* 
<p className=" bg-white rounded-lg shadow-md m-2 p-4">
  <Pie
    data = { durationBarState }
    options = {{
      plugins: {
      title: {
        display: true,
          font: {
            weight: 'bold',
            size: 30,
            },
          text: 'Pie Chart Title',
          color: '#BEBEBE',
          align: 'start',
          padding: {
            top: 20,
            bottom: 20
            }
          // fontSize: 20,
          },
        legend: {
          display: true,
          position: 'left'
          }
        }
    }}
  />
</p> 

<br></br>

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
*/