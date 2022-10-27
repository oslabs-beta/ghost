import * as React from 'react'
// import { useState, useEffect} from 'react';
import FunctionDetails from '../components/FunctionDetails';
import { useFunctionContext } from '../context/FunctionContext';
import Home from '../components/Home';
// import GraphComponent from '../components/GraphComponent'
import { useGraphContext } from '../context/GraphContext';
import CreateGraph from '../components/CreateGraph';
import PricingDetails from '../components/PricingDetails';


const MainContainer = () => {
  const { isMetricsEnabled, isPricingEnabled, isHomeEnabled } = useFunctionContext();
  const { createGraphIsShown } = useGraphContext();
  // const [ loading, setLoading ] = React.useState(false);

  // React.useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   },3000)
  // })
  
  return (
    <div className="bg-[#d6d4d4] dark:bg-[#191919] min-h-screen w-screen px-4/5">
      {/* <h1 className="text-7xl p-4 font-bold bg-gradient-to-r from-rose-400 to-blue-300 dark:from-blue-800 dark:to-purple-900 bg-clip-text text-transparent animate-bounce">RIP Raw Dogs...</h1> */}
        {createGraphIsShown ? <CreateGraph /> : null}
        {isMetricsEnabled ? <FunctionDetails /> : null}
        {isPricingEnabled ? <PricingDetails /> : null}
        {isHomeEnabled ? <Home /> : null}
    </div>
  )
}

export default MainContainer;