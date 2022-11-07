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
  const [metrics, setMetrics] = React.useState<any>([]);
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
        // how to iterate thru streamNames then call fetch on each iteration?
        const streamName = (data[0].streamName);
        fetch('http://localhost:3000/basicMetrics', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ functionName: functionName, streamName: streamName })})
          .then((res) => res.json())
          .then((data) => {
            setMetrics(data);
          })
          .catch((err) => {
            console.log('Error fetching metrics:', err);
          });
      })
      .catch((err) => {
        console.log('Error fetching lambda functions:', err);
      }
      );
  }, [functionName]);

  // pull out timestamps, durations, memory from basicMetrics
  const timestamps: Array<string> = metrics.map((item: any) => item.timestamp.slice(-11));
  const durations: Array<number> = metrics.map((item: any) => parseInt(item.duration.replace(/\D/g,'')));
  const memory: Array<number> = metrics.map((item: any) => parseInt(item.maxMemoryUsed.replace(/\D/g,'')));

  return (
    <div className='p-5'>
      <p className='text-gray-700 dark:text-[#D3D4D4] text-lg'>Viewing metrics for:</p>
      <p className='text-gray-900 dark:text-gray-100 text-4xl'>{functionName}</p>
    <GraphComponent timestamps={timestamps} durations={durations} memory={memory} />
    </div>
  )
}

export default FunctionDetails;