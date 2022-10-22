import * as React from 'react'
import { useFunctionContext } from '../context/FunctionContext'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

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

  return (

    <div>
      <h1>Create Graph</h1>
      <Select label='Graph Type'>
        <MenuItem>Line</MenuItem>
        <MenuItem>Bar</MenuItem>
      </Select>
    </div>
  )
}

export default CreateGraph