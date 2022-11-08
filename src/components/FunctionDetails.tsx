import * as React from 'react';
import { useFunctionContext } from '../context/FunctionContext';
import { useGraphContext } from '../context/GraphContext';
import GraphComponent from './GraphComponent';

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
  
  // noticeable delay in rendering the fetched data - implement loading skeleton?
  React.useEffect(() => {
    fetch('http://localhost:3000/logStreams', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ functionName: functionName })
      })
      .then((res) => res.json())
      .then((data) => { 
        // default metrics are being pulled from the first log stream
        const streamName = (data[0].streamName);
        // using promise all to fetch from both endpoints at the same time
        Promise.all([
          fetch('http://localhost:3000/basicMetrics', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ functionName: functionName, streamName: streamName })}),
          fetch('http://localhost:3000/coldMetricsPlus', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ functionName: functionName })})
        ])
          .then(([basicMetrics, coldMetrics]) => Promise.all([basicMetrics.json(), coldMetrics.json()]))
          .then(([basicMetrics, coldMetrics]) => {
            setDefaultMetrics(basicMetrics);
            setColdStartMetrics(coldMetrics);
          })
          .catch((err) => console.log('Error fetching metrics: ', err))
      })
      .catch((err) => {
        console.log('Error fetching lambda functions:', err);
      }
      );
  }, [functionName]);

  return (
    <div className='p-5'>
      <p className='text-gray-700 dark:text-[#D3D4D4] text-lg'>Viewing metrics for:</p>
      <p className='text-gray-900 dark:text-gray-100 text-4xl'>{functionName}</p>
      <GraphComponent defaultMetrics={defaultMetrics} coldStartMetrics={coldStartMetrics} />
    </div>
  )
}

export default FunctionDetails;