import * as React from 'react';
import { useFunctionContext } from '../context/FunctionContext';
import { useMainPageContext } from '../context/MainPageContext';
import GraphComponent from './GraphComponent';
import Loader from './GraphLoader';


/* 
List of Metrics (each obj is 1 minute):

Errors
ConcurrentExecutions
Invocations
Duration
Throttles
UrlRequestCount
*/

const FunctionDetails = () => {
  const [defaultMetrics, setDefaultMetrics] = React.useState<any>([]);
  const [coldStartMetrics, setColdStartMetrics] = React.useState<any>([]);
  const { functionName } = useFunctionContext();
  const { loading, setLoading } = useMainPageContext();
  
  React.useEffect(() => {
    fetch('http://localhost:3000/metric/recent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ functionName: functionName })
        })
        .then(response => response.json())
        .then(data => {
          setDefaultMetrics(data);
        })
  }, [functionName]);

  // TODO: move cold start metrics to custom graph component

  return (
    <div className='p-5'>
      <p className='text-gray-700 dark:text-[#D3D4D4] text-lg'>Viewing metrics for:</p>
      <p className='text-gray-900 dark:text-gray-100 text-4xl'>{functionName}</p>
      <GraphComponent defaultMetrics={defaultMetrics} coldStartMetrics={coldStartMetrics} />
    </div>
  )
}

export default FunctionDetails;