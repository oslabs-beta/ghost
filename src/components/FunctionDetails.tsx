import * as React from 'react';
import { useFunctionContext } from '../context/FunctionContext';

const FunctionDetails = () => {
  const [metrics, setMetrics] = React.useState<any>([]);
  const { functionName } = useFunctionContext();

  // noticeable delay in rendering the fetched data
    React.useEffect(() => {
    fetch('http://localhost:3000/logStreams', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ functionName: functionName })
      })
      .then((res) => res.json())
      .then((data) => {
        const streamName = (data[0].streamName);
        console.log('streamName:', streamName);
        fetch('http://localhost:3000/rawLogs', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ functionName: functionName, streamName: streamName })})
          .then((res) => res.json())
          .then((data) => {
            setMetrics(data);
          })
          .catch((err) => {
            console.log('Error fetching raw logs:', err);
          });
      })
      .catch((err) => {
        console.log('Error fetching lambda functions:', err);
      }
      );
  }, [functionName]);
  

  return (
    <div className='p-5'>
      <p className='text-gray-700 text-lg'>Viewing metrics for:</p>
      <p className='text-gray-900 text-4xl'>{functionName}</p>
      {metrics.map(function(metric: any) {
        return (
          <div className='text-gray-700'>
            <p>{metric.ingestionTime}</p>
            <p>{metric.message}</p>
            <p>{metric.timestamp}</p>
          </div>
        )
      })}
    </div>
  )
}

export default FunctionDetails;