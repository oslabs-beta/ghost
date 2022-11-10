import * as React from 'react';
import { useFunctionContext } from '../context/FunctionContext';
import { useMainPageContext } from '../context/MainPageContext';
import { useGraphContext } from '../context/GraphContext';
import GraphComponent from './GraphComponent';
import GraphLoader from './GraphLoader';

const FunctionDetails = () => {
  const [error, showError] = React.useState(false);
  const { functionName } = useFunctionContext();
  const { loading, setLoading } = useMainPageContext();
  const { defaultMetrics, setDefaultMetrics } = useGraphContext();
  
  // fetch most recent metrics & initialize skeleton
  React.useEffect(() => {
    setLoading?.(true);
    fetch('http://localhost:3000/metric/recent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ functionName: functionName })
        })
        .then(response => response.json())
        .then(data => {
          // if backend returns an error message, do not render data or else it will crash
          if (!Array.isArray(data)) {
            setLoading?.(false);
            showError(true);
          }
          else {
            showError(false);
            setDefaultMetrics?.(data);
            setLoading?.(false);
          }
        })
  }, [functionName]);

  return (
    <div className='p-5'>
      <p className='text-gray-700 dark:text-[#D3D4D4] text-lg'>Viewing metrics for:</p>
      <p className='text-gray-900 dark:text-gray-100 text-4xl font-bold'>{functionName}</p>
      { error ? <p className='text-lg text-red-600 dark:text-red-40 mt-5'>There was an error retrieving metrics for this function. Please try again or try a different function.</p> : null }
      {loading ? <GraphLoader /> : !error && <GraphComponent />}
      
    </div>
  )
}

export default FunctionDetails;