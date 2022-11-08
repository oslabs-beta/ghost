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
        // check if a second log stream exists for more cold start data to display
        const streamName2 = (data[1] ? data[1].streamName : null);
        // using promise all to fetch from both endpoints at the same time
        // if no second log stream exists, we will only do 2 fetches
        if (!streamName2) {
            Promise.all([
              fetch('http://localhost:3000/basicMetrics', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ functionName: functionName, streamName: streamName })}),
              fetch('http://localhost:3000/coldMetrics', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ functionName: functionName, streamName: streamName })})
            ])
              .then(([basicMetrics, coldMetrics]) => Promise.all([basicMetrics.json(), coldMetrics.json()]))
              .then(([basicMetrics, coldMetrics]) => {
                // combine basicMetrics and coldMetrics
                const combinedMetrics = basicMetrics.map((item: any, index: number) => {
                  return {
                    ...item,
                    ...coldMetrics[index]
                  }
                })
                setDefaultMetrics(combinedMetrics);
                // console.log('combined basic and cold metrics', combinedMetrics);
              })
              .catch((err) => {
                console.log('Error fetching metrics:', err);
              });
          } else {
            // if a second log stream exists, we will do 3 fetches to get additional cold start data
            Promise.all([
              fetch('http://localhost:3000/basicMetrics', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ functionName: functionName, streamName: streamName })}),
              fetch('http://localhost:3000/coldMetrics', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ functionName: functionName, streamName: streamName })}),
              fetch('http://localhost:3000/coldMetrics', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ functionName: functionName, streamName: streamName2 })})
            ])
            .then(([basicMetrics, coldMetrics, moreColdMetrics]) => Promise.all([basicMetrics.json(), coldMetrics.json(), moreColdMetrics.json()]))
            .then(([basicMetrics, coldMetrics, moreColdMetrics]) => {
              // combine the 2 cold metrics arrays
              const combinedColdMetrics = coldMetrics.concat(moreColdMetrics);
              // combine basicMetrics and coldMetrics
              const combinedMetrics = basicMetrics.map((item: any, index: number) => {
                return {
                  ...item,
                  ...combinedColdMetrics[index]
                }
              })
              setDefaultMetrics(combinedMetrics);
            })
          .catch((err) => {
            console.log('Error fetching metrics:', err);
          });
        } 
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
      <GraphComponent defaultMetrics={defaultMetrics} />
    </div>
  )
}

export default FunctionDetails;