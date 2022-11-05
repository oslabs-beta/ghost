import * as React from 'react'
import { useFunctionContext } from '../context/FunctionContext'
import { useGraphContext } from '../context/GraphContext'
import { Select, Button, TextField } from '@mui/material'
import { Menu, MenuItem, FormControl, FormHelperText, InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { HouseRounded } from '@mui/icons-material';
import * as dayjs from 'dayjs';

/*
  1. should read the selected function from context
  2. dropdown for metrics: Errors, ConcurrentExecutions, Invocations, Duration, Throttles
  - Invocations - sum
  - Durations - average, min, max
  - Concurrent Executions - max
  3. select graph: line, bar, double line
  4. color choices: provide limited options? or allow colorpicker? - this can be last
  5. date/time picker to pick dates and times - end time must be +5 min from start time
  6. dropdown Y axes: Average, Sum, Minimum, Maximum - can we make this dynamic based on the metric selected? maybe post-MVP?
  7. on submit, save custom graphs to database? - post-MVP

  save to an object that will be sent to the backend: function name, metric, start time, end time
  save the above + the graph type in an object to the state
  all custom graphs should be an object, and the state should be an array of objects
    if object.graphType === line, render line graph
    if object.graphType === bar, render bar graph
    if object.graphType === double line, render double line graph


*/

const CreateGraph = () => {
  // pull relevant state out of context
  const { functionName } = useFunctionContext();
  const { customGraphs, setCustomGraphs, graphType, setGraphType, metricName, setMetricName, graphName, setGraphName, startTime, setStartTime, endTime, setEndTime, metricData, setMetricData } = useGraphContext();

  // store list of metrics and graphtypes in an array
  const graphTypeNames = ['Line', 'Bar', 'Pie'];
  const metricNames = ['Errors', 'ConcurrentExecutions', 'Invocations', 'Duration', 'Throttles', 'UrlRequestCount'];

  // on submit, save all user-inputted data to object
  const handleSubmit = () => {
    const newCustomGraph = {
      functionName: functionName,
      graphName: graphName,
      graphType: graphType,
      metricName: metricName,
      startTime: startTime,
      endTime: endTime,
      metricData: metricData
    }
    // post request to backend to get metric data
    fetch('http://localhost:3000/moreMetrics', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        functionName: functionName,
        metricName: metricName,
        startTime: startTime,
        endTime: endTime
      })
    })
    .then(res => res.json())
    .then(data => {
      // set the metric data to the state
      setMetricData?.(data);
      // save the graph setup to the state, in addition to all the previous graphs
      setCustomGraphs?.((prev: any) => [...prev, newCustomGraph])
      console.log('custom graphs in array: ', customGraphs)
    })
  }

  return (
    <div className="flex flex-col bg-[#B2CAB3] dark:bg-[#313131] p-10">
      <h1 className="text-[#313131] dark:text-[#ebebeb]">Create Graph for { functionName }</h1>
      <br></br>
      <TextField className="w-auto" id="outlined-basic" placeholder="Invocations per minute" label="Graph Name" variant="outlined" onChange={(e) => setGraphName?.(e.target.value)} />
      <br></br>

      <InputLabel id="metrics">Metrics</InputLabel>
      <Select labelId="metrics" id="metrics-select" className="w-auto" label='Metrics'>     
        {metricNames.map((metricName) => (
          <MenuItem key={metricName} value={metricName} onClick={() => setMetricName?.(metricName)}>{metricName}</MenuItem>
        ))}
      </Select>
      <br></br>

      <FormHelperText>Graph Type</FormHelperText>
      <Select id="graph-type" className="w-auto" label='Graph Type'>
        {graphTypeNames.map((graphType) => (
          <MenuItem value={graphType} onClick={() => setGraphType?.(graphType)}>{graphType}</MenuItem>
        ))}
      </Select>
      <br></br>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Start Date & Time"
          minutesStep={5}
          value={startTime}
          onChange={(newValue) => {
            const newDate = new Date(newValue).toLocaleString();
            console.log(newDate);
            setStartTime?.(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      
      </LocalizationProvider>
      <br></br>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="End Date & Time"
          minutesStep={5}
          value={endTime}
          onChange={(newValue) => {
            // only allow the date and time to be set, if the time within 12 hours time difference
              let newDate = new Date(newValue).toLocaleString();
              dayjs(newDate).isAfter(dayjs(startTime).add(12, 'hour')) ? alert('Please select a time within 12 hours of the start time') : setEndTime?.(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      
      </LocalizationProvider>
      <br></br>

      <Button className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
              variant="outlined"
              disableElevation
              sx={{
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
            >
              Submit
            </Button>
    </div>
  )
}


export default CreateGraph;