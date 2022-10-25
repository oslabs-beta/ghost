import * as React from 'react';

// declare data types for states and hooks being passed to context in an interface
interface FunctionContextProps {
  functionName: string | undefined,
  streamName: string,
  setFunctionName?: (name: string) => void,
  setStreamName?: (name: string) => void,

  children?: React.ReactNode
}

// declare default values for states being passed to context
const defaultState = {
  functionName: '',
  streamName: '',

}

// use createContext to create a context object
export const FunctionContext = React.createContext<FunctionContextProps>(defaultState);

// create a provider component to wrap around components that need access to context
// pass in children as props to provider component
// children = all the components that need access to context
const FunctionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [functionName, setFunctionName] = React.useState('');
  const [streamName, setStreamName] = React.useState('');


  return (
    <FunctionContext.Provider
      value={{
        functionName,
        streamName,
        setFunctionName,
        setStreamName,
      }}
    >
      {children}
    </FunctionContext.Provider>
  )
}

export const useFunctionContext = () =>  React.useContext(FunctionContext);

export default FunctionContextProvider