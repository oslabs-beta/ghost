import * as React from 'react'
import { useFunctionContext } from '../context/FunctionContext'
import { useGraphContext } from '../context/GraphContext'
import { Select, Button, TextField } from '@mui/material'
import { Menu, MenuItem, FormControl, FormHelperText, InputLabel } from '@mui/material';
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
  // pull functionName out of context
  const { functionName } = useFunctionContext();
  const { setCustomGraphs, graphType, setGraphType, metricName, setMetricName, graphName, setGraphName } = useGraphContext();

  // store list of metrics and graphtypes in an array
  const graphTypeNames = ['Line', 'Bar', 'Pie'];
  const metricNames = ['Errors', 'ConcurrentExecutions', 'Invocations', 'Duration', 'Throttles', 'UrlRequestCount'];

  // on submit, save the graph to the state, in addition to all the previous graphs
  const handleSubmit = () => {
    const newCustomGraph = {
      functionName: functionName,
      graphName: graphName,
      graphType: graphType,
      metricName: metricName
    }
    setCustomGraphs?.((prev: any) => [...prev, newCustomGraph]);
  }

  // declare a function: handleMetricsClick, to test out the onClick setMetrics
  // const handleMetricsClick = (e) => {
  //   setMetrics({})
  // }  

  // const { graphName } = useGraphContext();
  // const { graphType } = useGraphContext();
  // const { dataset1 } = useGraphContext();
  // const { dataset2 } = useGraphContext();

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   const body = {
  //     name: e.target[0].value,
  //     type: e.target[1].value,

  //   }
  // }

  return (
    <div className="flex flex-col bg-[#B2CAB3] dark:bg-[#313131] p-10">
      <h1 className="text-[#313131] dark:text-[#ebebeb]">Create Graph for { functionName }</h1>
      <br></br>
      <TextField className="w-auto" id="outlined-basic" placeholder="Nuts per second" label="Graph Name" variant="outlined" onChange={(e) => setGraphName?.(e.target.value)} />
      <br></br>

      {/* <FormHelperText>Metrics</FormHelperText> */}
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