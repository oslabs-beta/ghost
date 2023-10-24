import * as React from 'react'
import { Select, Button, TextField, MenuItem, InputLabel } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import * as dayjs from 'dayjs'
import { useMainPageContext } from '../context/MainPageContext'
import CreateGraphLoader from './CreateGraphLoader'
import { useGraphContext } from '../context/GraphContext'
import { useFunctionContext } from '../context/FunctionContext'

function CreateGraph () {
  // pull relevant state out of context
  const { functionName } = useFunctionContext()
  const {
    setCustomGraphs,
    graphType,
    setGraphType,
    metricName,
    setMetricName,
    graphName,
    setGraphName,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    datapointType,
    setDatapointType
  } = useGraphContext()
  const { createLoading, setCreateLoading } = useMainPageContext()
  const [coldStartDate, setColdStartDate] = React.useState('')
  const [errorNoData, setErrorNoData] = React.useState(false)
  const [errorTooMuchData, setErrorTooMuchData] = React.useState(false)

  // store list of metrics and graphtypes in an array
  const graphTypeNames = ['Line', 'Bar', 'Pie', 'MultiLine']
  const metricNames = [
    'Errors',
    'ConcurrentExecutions',
    'Invocations',
    'Duration',
    'Throttles',
    'UrlRequestCount',
    'ColdStarts'
  ]
  const datapointTypeNames = ['Average', 'Sum', 'Minimum', 'Maximum']

  // on submit, send the data to the backend
  async function handleSubmit () {
    setErrorTooMuchData(false)
    setErrorNoData(false)
    setCreateLoading?.(true)
    // call custom metric API
    const res = await fetch('http://localhost:3000/metric/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        functionName,
        metricName,
        startTime,
        endTime
      })
    })
    const data = await res.json()
    setCreateLoading?.(false)

    // error handling to display to the user
    if (data.tooManyDatapoints) {
      setErrorTooMuchData(true)
    } else if (data.Datapoints.length === 0) {
      setErrorNoData(true)
    } else {
      // save the graph setup to the state, in addition to all the previous graphs
      const newCustomGraph = {
        functionName,
        graphName,
        graphType,
        metricName,
        date: coldStartDate,
        metricData: data,
        datapointType
      }
      setCustomGraphs?.((prev: any) => [...prev, newCustomGraph])
    }
  }

  // if selected metric is coldstarts, this function will fire on submit
  async function handleSubmitColdStarts () {
    setErrorTooMuchData(false)
    setErrorNoData(false)
    setCreateLoading?.(true)
    const res = await fetch('http://localhost:3000/metric/cold', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        functionName,
        date: coldStartDate
      })
    })
    const data = await res.json()
    setCreateLoading?.(false)

    // error handling to display to the user
    if (data.tooManyDatapoints) {
      setErrorTooMuchData(true)
    } else if (data.length === 0) {
      setErrorNoData(true)
    } else {
      // save the graph setup to the state, in addition to all the previous graphs
      const newCustomGraph = {
        functionName,
        graphName,
        graphType,
        metricName,
        date: coldStartDate,
        metricData: data,
        datapointType
      }
      setCustomGraphs?.((prev: any) => [...prev, newCustomGraph])
    }
  }

  return (
    <div className="flex flex-col bg-[#B2CAB3] dark:bg-[#313131] p-10">
      <h1 className="text-[#313131] dark:text-[#ebebeb]">
        Create Graph for
        <b>{functionName}</b>
      </h1>
      <br />
      <InputLabel id="graph-name">Graph Name</InputLabel>
      <TextField
        className="w-auto"
        id="outlined-basic"
        placeholder="Invocations per minute"
        variant="outlined"
        onChange={(e) => setGraphName?.(e.target.value)}
      />
      <br />

      <InputLabel id="metrics">Metrics</InputLabel>
      <Select labelId="metrics" id="metrics-select" className="w-auto">
        {metricNames.map((metricName) => (
          <MenuItem
            key={metricName}
            value={metricName}
            onClick={() => setMetricName?.(metricName)}
          >
            {metricName}
          </MenuItem>
        ))}
      </Select>
      <br />

      {metricName === 'ColdStarts'
        ? null
        : (
        <>
          <InputLabel id="graph-type">Graph Type</InputLabel>
          <Select id="graph-type" className="w-auto">
            {graphTypeNames.map((graphType) => (
              <MenuItem
                value={graphType}
                onClick={() => setGraphType?.(graphType)}
              >
                {graphType}
              </MenuItem>
            ))}
          </Select>
          <br />
        </>
          )}

      {(metricName !== 'ColdStarts' && graphType == 'Line') ||
      graphType == 'Bar' ||
      graphType == 'Pie'
        ? (
        <>
          <InputLabel id="datapoints-type">Datapoints Type</InputLabel>
          <Select id="datapoints-type" className="w-auto">
            {datapointTypeNames.map((datapointType) => (
              <MenuItem
                value={datapointType}
                onClick={() => setDatapointType?.(datapointType)}
              >
                {datapointType}
              </MenuItem>
            ))}
          </Select>
          <br />
        </>
          )
        : null}

      {metricName === 'ColdStarts' ? (
        <>
          <InputLabel id="cold-start-date">Select Date</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              // label="Select Date"
              value={coldStartDate}
              onChange={(newValue) => {
                const newDate = dayjs(newValue).format('YYYY/MM/DD')
                console.log(newDate)
                setColdStartDate(newDate)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br />
        </>
      ) : (
        <>
          <InputLabel id="start-date-and-time">Start Date & Time</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              minutesStep={5}
              value={startTime}
              onChange={(newValue) => {
                const newDate = new Date(newValue).toLocaleString()
                setStartTime?.(newDate)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br />

          <InputLabel id="end-date-and-time">End Date & Time</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              minutesStep={5}
              value={endTime}
              onChange={(newValue) => {
                // only allow the date and time to be set, if the time within 24 hours time difference
                const newDate = new Date(newValue).toLocaleString()
                dayjs(newDate).isAfter(dayjs(startTime).add(24, 'hour'))
                  ? alert(
                    'Please select a time within 24 hours of the start time'
                  )
                  : setEndTime?.(newDate)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br />
        </>
      )}

      <Button
        className="dark:bg-[#7f9f80] dark:hover:bg-[#BFBFBF] dark:hover:text-[#242424]"
        variant="outlined"
        disableElevation
        sx={{
          backgroundColor: '#9cb59d',
          borderColor: '#9cb59d',
          color: '#FFFFFF',
          '&:hover': {
            borderColor: '#9cb59d',
            backgroundColor: '#F5F5F5',
            color: '#9cb59d'
          }
        }}
        size="small"
        onClick={
          metricName === 'ColdStarts' ? handleSubmitColdStarts : handleSubmit
        }
      >
        SUBMIT
      </Button>
      <br />
      {errorNoData
        ? (
        <p className="text-lg text-red-600 dark:text-red-400">
          Error: No datapoints available for this time range.
        </p>
          )
        : null}
      {errorTooMuchData
        ? (
        <p className="text-lg text-red-600 dark:text-red-400">
          Error: Too many datapoints available for this time range. Please
          select a smaller time range.
        </p>
          )
        : null}
      {createLoading
        ? (
        <div className="flex justify-center">
          <CreateGraphLoader />
        </div>
          )
        : null}
    </div>
  )
}

export default CreateGraph
