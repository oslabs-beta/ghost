import * as React from 'react';

// declare data types for states and hooks being passed to context in an interface
interface FunctionContextProps {
  functionName: string | undefined,
  streamName: string,
  isMetricsEnabled: boolean,
  isPricingEnabled: boolean,
  isHomeEnabled: boolean,
  setFunctionName?: (name: string) => void,
  setStreamName?: (name: string) => void,
  setIsMetricsEnabled?: (isMetricsEnabled: boolean) => void,
  setIsPricingEnabled?: (isPricingEnabled: boolean) => void,
  setIsHomeEnabled?: (isHomeEnabled: boolean) => void,

  children?: React.ReactNode
}

// declare default values for states being passed to context
const defaultState = {
  functionName: '',
  streamName: '',
  isMetricsEnabled: false,
  isPricingEnabled: false,
  isHomeEnabled: true,
}

// use createContext to create a context object
export const FunctionContext = React.createContext<FunctionContextProps>(defaultState);

// create a provider component to wrap around components that need access to context
// pass in children as props to provider component
// children = all the components that need access to context
const FunctionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [functionName, setFunctionName] = React.useState('');
  const [streamName, setStreamName] = React.useState('');
  const [isMetricsEnabled, setIsMetricsEnabled] = React.useState(false);
  const [isPricingEnabled, setIsPricingEnabled] = React.useState(false);
  const [isHomeEnabled, setIsHomeEnabled] = React.useState(true);


  return (
    <FunctionContext.Provider
      value={{
        functionName,
        streamName,
        setFunctionName,
        setStreamName,
        isMetricsEnabled,
        isPricingEnabled,
        isHomeEnabled,
        setIsMetricsEnabled,
        setIsPricingEnabled,
        setIsHomeEnabled,
      }}
    >
      {children}
    </FunctionContext.Provider>
  )
}

export const useFunctionContext = () =>  React.useContext(FunctionContext);

export default FunctionContextProvider