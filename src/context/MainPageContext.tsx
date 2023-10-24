import * as React from 'react'

// declare data types for states and hooks being passed to context in an interface
interface MainPageContextProps {
  loading: boolean
  priceLoading: boolean
  createLoading: boolean
  setLoading?: (loading: boolean) => void
  setPriceLoading?: (priceLoading: boolean) => void
  setCreateLoading?: (createLoading: boolean) => void
  children?: React.ReactNode
}

// declare default values for states being passed to context
const defaultState = {
  loading: false,
  priceLoading: false,
  createLoading: false
}

// use createContext to create a context object
export const MainPageContext =
  React.createContext<MainPageContextProps>(defaultState)

// create a provider component to wrap around components that need access to context
// pass in children as props to provider component
// children = all the components that need access to context
function MainPageContextProvider ({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(false)
  const [priceLoading, setPriceLoading] = React.useState(false)
  const [createLoading, setCreateLoading] = React.useState(false)

  return (
    <MainPageContext.Provider
      value={{
        loading,
        priceLoading,
        createLoading,
        setLoading,
        setPriceLoading,
        setCreateLoading
      }}
    >
      {children}
    </MainPageContext.Provider>
  )
}

export const useMainPageContext = () => React.useContext(MainPageContext)

export default MainPageContextProvider
