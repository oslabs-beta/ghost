import * as React from 'react'
import { useFunctionContext } from '../context/FunctionContext'
import { useGraphContext } from '../context/GraphContext'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

/*
  1. should read the selected function from context
  2. select metric they want to make a graph of
  3. select graph: line, bar
  4. color choices: provide limited options? or allow colorpicker?
  5. allow user to select size of graph
  6. axes: allow user to select axes
  7. on submit, save custom graphs to database?
*/

const CreateGraph = () => {
  const { functionName } = useFunctionContext();
  const { graphName } = useGraphContext();
  const { graphType } = useGraphContext();
  const { dataset1 } = useGraphContext();
  const { dataset2 } = useGraphContext();

  const handleClick = async (e) => {
    e.preventDefault();
    const body = {
      name: e.target[0].value,
      type: e.target[1].value,

    }
  }

  return (
    <div>
      <h1>Create Graph for { functionName }</h1>
      <TextField id="outlined-basic" label="Graph Name" defaultValue="Runtime Duration" variant="outlined" />

      <Select label='Graph Type'>
        <MenuItem>Line</MenuItem>
        <MenuItem>Double Line</MenuItem>
        <MenuItem>Bar</MenuItem>
      </Select>
    </div>
  )
}

export default CreateGraph