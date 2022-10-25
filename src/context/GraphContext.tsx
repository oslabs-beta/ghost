import * as React from 'react';

// declare data types for states and hooks being passed to context in an interface
interface GraphContextProps {
  graphName: string,
  graphType: string,
  dataset1: string,
  dataset2: string,
  dates: string[]

  setGraphName?: (name: string) => void,
  setGraphType?: (type: string) => void,
  setDataset1?: (data: string) => void,
  setDataset2?: (data: string) => void,
  setDates?: (dates: string[]) => void,

  children?: React.ReactNode
}

// declare default values for states being passed to context
const defaultState = {
  graphName: '',
  graphType: '',
  dataset1: '',
  dataset2: '',
  dates: [],
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
  const [dates, setDates] = React.useState('');

  return (
    <GraphContext.Provider
      value={{
        graphName,
        graphType,
        dataset1,
        dataset2,
        dates,
        setGraphName,
        setGraphType,
        setDataset1,
        setDataset2,
        setDates
      }}
    >
      {children}
    </GraphContext.Provider>
  )
}

export const useGraphContext = () =>  React.useContext(GraphContext);

export default GraphContextProvider;