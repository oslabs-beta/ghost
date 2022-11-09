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
  const { setCustomGraphs, graphType, setGraphType, metricName, setMetricName, graphName, setGraphName, startTime, setStartTime, endTime, setEndTime, datapointType, setDatapointType } = useGraphContext();
  const [errorNoData, setErrorNoData] = React.useState(false);
  const [errorTooMuchData, setErrorTooMuchData] = React.useState(false);

  // store list of metrics and graphtypes in an array
  const graphTypeNames = ['Line', 'Bar', 'Pie', 'MultiLine'];
  const metricNames = ['Errors', 'ConcurrentExecutions', 'Invocations', 'Duration', 'Throttles', 'UrlRequestCount'];
  const datapointTypeNames = ['Average', 'Sum', 'Minimum', 'Maximum'];

  // on submit, send the data to the backend
  async function handleSubmit() {
    // call the fetch function
    const res = await fetch('http://localhost:3000/metric/custom', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        functionName: functionName,
        metricName: metricName,
        startTime: startTime,
        endTime: endTime
      })
    })
    const data = await res.json();
    
    // if there are too many datapoints, alert the user
    if (data.tooManyDatapoints) {
      setErrorTooMuchData(true);
    }
    // if there are no datapoints in array, alert the user
    else if (data.Datapoints.length === 0) {
      setErrorNoData(true);
    }
    else {
    // save the graph setup to the state, in addition to all the previous graphs
    const newCustomGraph = {
      functionName: functionName,
      graphName: graphName,
      graphType: graphType,
      metricName: metricName,
      startTime: startTime,
      endTime: endTime,
      metricData: data,
      datapointType: datapointType
    }
    setCustomGraphs?.((prev: any) => [...prev, newCustomGraph])
  }}

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

      <InputLabel id="graph-type">Graph Type</InputLabel>
      <Select id="graph-type" className="w-auto" label='Graph Type'>
        {graphTypeNames.map((graphType) => (
          <MenuItem value={graphType} onClick={() => setGraphType?.(graphType)}>{graphType}</MenuItem>
        ))}
      </Select>
      <br></br>

      { graphType === 'Bar' || graphType === 'Pie' || graphType === 'Line' ? 
      <>
        <InputLabel id="datapoints-type">Datapoints Type</InputLabel>
        <Select id="datapoints-type" className="w-auto" label='Graph Type'>
          {datapointTypeNames.map((datapointType) => (
            <MenuItem value={datapointType} onClick={() => setDatapointType?.(datapointType)}>{datapointType}</MenuItem>
          ))}
        </Select>
        <br></br>
      </>
      :
      null
      }

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Start Date & Time"
          minutesStep={5}
          value={startTime}
          onChange={(newValue) => {
            const newDate = new Date(newValue).toLocaleString();
            setStartTime?.(newDate);
            // set the default end time to 23h59m after the start time
            const newDatePlus24 = dayjs(newDate).add(23, 'hour').add(59, 'minute').format('MM/DD/YY, HH:mm:ss A');
            setEndTime?.(newDatePlus24);
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
              dayjs(newDate).isAfter(dayjs(startTime).add(24, 'hour')) ? alert('Please select a time within 24 hours of the start time') : setEndTime?.(newDate);
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
              SUBMIT
            </Button>
            <br></br>
            { errorNoData ? <p className="text-lg text-red-600 dark:text-red-400">Error: No datapoints available for this time range.</p> : null }
            { errorTooMuchData ? <p className="text-lg text-red-600 dark:text-red-400">Error: Too many datapoints available for this time range. Please select a smaller time range.</p> : null }
    </div>
  )
}


export default CreateGraph;