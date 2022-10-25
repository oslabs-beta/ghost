import * as React from 'react'
import { useFunctionContext } from '../context/FunctionContext'
import { useGraphContext } from '../context/GraphContext'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

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
  7. on submit, save custom graphs to database? - post-MVP?
*/

const CreateGraph = () => {
  const { functionName } = useFunctionContext();
  const { graphName } = useGraphContext();
  const { graphType } = useGraphContext();
  const { dataset1 } = useGraphContext();
  const { dataset2 } = useGraphContext();

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
      <br></br>
      <TextField className="w-auto" id="outlined-basic" label="Graph Name" defaultValue="Runtime Duration" variant="outlined" />

      <Select className="w-auto" id="metrics-select" label='Metrics'>
        <MenuItem>Errors</MenuItem>
        <MenuItem>Concurrent Executions</MenuItem>
        <MenuItem>Invocations</MenuItem>
        <MenuItem>Duration</MenuItem>
        <MenuItem>Throttle</MenuItem>
      </Select>

      <Select className="w-auto" label='Graph Type'>
        <MenuItem>Line</MenuItem>
        <MenuItem>Double Line</MenuItem>
        <MenuItem>Bar</MenuItem>
      </Select>
    </div>
  )
}

export default CreateGraph