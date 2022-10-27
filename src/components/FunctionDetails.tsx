import * as React from 'react';
import { useFunctionContext } from '../context/FunctionContext';
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
  const [errors, setErrors] = React.useState<any>([]);
  const [concurrentExecutions, setConcurrentExecutions] = React.useState<any>([]);
  const [throttles, setThrottles] = React.useState<any>([]);
  const [invocationsMore, setInvocationsMore] = React.useState<any>([]);
  const [durationMore, setDurationMore] = React.useState<any>([]);
  const [urlRequestCount, setUrlRequestCount] = React.useState<any>([]);
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

  // hardcoding moreMetrics for now
  React.useEffect(() => {
  const metricNames = ['Errors', 'ConcurrentExecutions', 'Invocations', 'Throttles'];
  metricNames.forEach((metricName) => {
    fetch('http://localhost:3000/moreMetrics', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        functionName: functionName,
        metricName: metricName,
        startTime: '10/22/2022 12:00:00 PM',
        endTime: '10/22/2022 11:59:59 PM'
      })
    })
    .then((res) => res.json())
    .then((data) => {
      if (metricName === 'Errors') {
        setErrors(data.Datapoints);
      } else if (metricName === 'ConcurrentExecutions') {
        setConcurrentExecutions(data.Datapoints);
      } else if (metricName === 'Throttles') {
        setThrottles(data.Datapoints);
      } else if (metricName === 'Invocations') {
        setInvocationsMore(data.Datapoints);
      } else if (metricName === 'Duration') {
        setDurationMore(data.Datapoints);
      } else if (metricName === 'UrlRequestCount') {
        setUrlRequestCount(data.Datapoints);
    }})
    .catch((err) => {
      console.log('Error fetching metrics:', err);
    });
  })
  }, [functionName]);

  return (
    <div className='p-5'>
      <p className='text-gray-700 dark:text-[#D3D4D4] text-lg'>Viewing metrics for:</p>
      <p className='text-gray-900 dark:text-gray-100 text-4xl'>{functionName}</p>
    <GraphComponent timestamps={timestamps} durations={durations} memory={memory} errors={errors} throttles={throttles} concurrentExecutions={concurrentExecutions} invocationsMore={invocationsMore} durationMore={durationMore} urlRequestCount={urlRequestCount} />
    </div>
  )
}

export default FunctionDetails;