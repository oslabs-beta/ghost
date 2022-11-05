import * as React from 'react';

// declare data types for states and hooks being passed to context in an interface
interface GraphContextProps {
  createGraphIsShown: boolean,
  customGraphs: any,
  graphName: string,
  graphType: string,
  metricName: string,
  dataset1: string,
  dataset2: string,
  errors: string,
  concurrent: string,
  startTime: any,
  endTime: any,
  metricData: {},

  setGraphName?: (name: string) => void,
  setGraphType?: (type: string) => void,
  setMetricName?: (metric: string) => void,
  setDataset1?: (data: string) => void,
  setDataset2?: (data: string) => void,
  setErrors?: (data: string) => void,
  setConcurrent?: (data: string) => void,
  setStartTime?: (data: any) => void,
  setEndTime?: (date: any) => void,
  setMetricData?: (data: {}) => void,
  setCreateGraphIsShown?: (value: boolean) => void,
  setCustomGraphs?: (value: any) => any | void,

  children?: React.ReactNode
}

// declare default values for states being passed to context
const defaultState = {
  createGraphIsShown: false,
  graphName: '',
  graphType: '',
  metricName: '',
  dataset1: '',
  dataset2: '',
  errors: '',
  concurrent: '',
  startTime: '',
  endTime: '',
  metricData: {},
  customGraphs: [],
}

// use createContext to create a context object
export const GraphContext = React.createContext<GraphContextProps>(defaultState);

// create a provider component to wrap around components that need access to context
// pass in children as props to provider component
// children = all the components that need access to context
const GraphContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [graphName, setGraphName] = React.useState('');
  const [graphType, setGraphType] = React.useState('');
  const [dataset1, setDataset1] = React.useState('');
  const [dataset2, setDataset2] = React.useState('');
  const [errors, setErrors] = React.useState('');
  const [concurrent, setConcurrent] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const [metricData, setMetricData] = React.useState({});
  const [createGraphIsShown, setCreateGraphIsShown] = React.useState(false);
  const [customGraphs, setCustomGraphs] = React.useState([]);
  const [metricName, setMetricName] = React.useState('');

  return (
    <GraphContext.Provider
      value={{
        graphName,
        graphType,
        dataset1,
        dataset2,
        errors,
        concurrent,
        startTime,
        endTime,
        metricData,
        createGraphIsShown,
        setGraphName,
        setGraphType,
        setDataset1,
        setDataset2,
        setErrors,
        setConcurrent,
        setStartTime,
        setEndTime,
        setMetricData,
        setCreateGraphIsShown,
        customGraphs,
        setCustomGraphs,
        metricName,
        setMetricName
      }}
    >
      {children}
    </GraphContext.Provider>
  )
}

export const useGraphContext = () =>  React.useContext(GraphContext);

export default GraphContextProvider;