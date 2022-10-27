import * as React from 'react'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar, Scatter, Pie, Line } from 'react-chartjs-2'
import { fontSize } from '@mui/system';
import { BoltRounded } from '@mui/icons-material';
import { useGraphContext } from '../context/GraphContext';
import { useFunctionContext } from '../context/FunctionContext';

// initialize chartjs
ChartJS.register(...registerables);

// declare props
interface GraphComponentProps {
  timestamps: string[],
  durations: number[],
  memory: number[],
  errors: any,
  throttles: any,
  concurrentExecutions: any,
  invocations: any,
  durationsMore: any,
  urlRequestCount: any
}

const GraphComponent = ({ timestamps, memory, durations, errors, throttles, concurrentExecutions, durationsMore, urlRequestCount }: GraphComponentProps) => {
  const { customGraphs } = useGraphContext();
  const { functionName } = useFunctionContext();

  // manually counting invocations - can probably do away w/ this now that we have invocations from the back end
  const invocationObj: any = {};
  for (let i = 0; i < timestamps.length; i++) {
    if (invocationObj[timestamps[i]]) {
      invocationObj[timestamps[i]] += 1;
    }
    else {
      invocationObj[timestamps[i]] = 1;
    }
  }

  const invocations = Object.values(invocationObj);
  const singleTime = Object.keys(invocationObj);

  // pull out timestamps and sum from errors object
  const errorTimestamps: Array<string> = errors.map((item: any) => item.Timestamp.slice(-11));
  const errorCounts: Array<number> = errors.map((item: any) => item.Sum);

  // pull out timestamps and sum from throttles object
  const throttleTimestamps: Array<string> = throttles.map((item: any) => item.Timestamp.slice(-11));
  const throttleCounts: Array<number> = throttles.map((item: any) => item.Sum);

  // pull out timestamps and max from concurrentExecutions object
  const concurrentTimestamps: Array<string> = concurrentExecutions.map((item: any) => item.Timestamp.slice(-11));
  const concurrentCounts: Array<number> = concurrentExecutions.map((item: any) => item.Maximum);

  //

  // pull out timestamps and sum from durationsMore object
  const durationsMoreTimestamps: Array<string> = durationsMore.map((item: any) => item.Timestamp.slice(-11));
  const durationsMoreCounts: Array<number> = durationsMore.map((item: any) => item.Maximum);

  // pull out timestamps and sum from urlRequestCount object
  const urlRequestTimestamps: Array<string> = urlRequestCount.map((item: any) => item.Timestamp.slice(-11));
  const urlRequestCounts: Array<number> = urlRequestCount.map((item: any) => item.Sum);

  


  const durationBarState = {
    labels: timestamps,
    datasets: [
      {
        label: 'amount',
        backgroundColor: [
          '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
          ],
        borderWidth: 0,
        borderColor: 'black',
        data: durations,
        showLine: true,
      }
    ]
  }

  const memoryState = {
    labels: timestamps,
    datasets: [
      {
        label: 'Memory',
        data: memory,
        backgroundColor: [
          '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
          ],
        borderColor: '#9cb59d',
        fill: false,
        showLine: true,
        borderWidth: 1
      }
    ]
  }

  const invocationState = {
    labels: singleTime,
    datasets: [
      {
        label: 'Invocations',
        data: invocations,
        backgroundColor: [
          '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
          ],
        borderColor: '#9cb59d',
        fill: false,
        showLine: true,
        borderWidth: 1
      }
    ]
  }

  const errorState = {
    labels: errorTimestamps,
    datasets: [
      {
        label: 'Errors',
        data: errorCounts,
        backgroundColor: [
          '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
          ],
        borderColor: '#9cb59d',
        fill: false,
        showLine: true,
        borderWidth: 1
      }
    ]
  }

  const throttleState = {
    labels: throttleTimestamps,
    datasets: [
      {
        label: 'Throttles',
        data: throttleCounts,
        backgroundColor: [
          '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
          ],
        borderColor: '#9cb59d',
        fill: false,
        showLine: true,
        borderWidth: 1
      }
    ]
  }

  const concurrentExecState = {
    labels: concurrentTimestamps,
    datasets: [
      {
        label: 'Concurrent Executions',
        data: concurrentCounts,
        backgroundColor: [
          '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
          ],
        borderColor: '#9cb59d',
        fill: false,
        showLine: true,
        borderWidth: 1
      }
    ]
  }

  const multiState = {
    labels: timestamps,
    datasets: [
      {
        label: 'Memory Used',
        data: memory,
        borderColor: '#B2CAB3',
        backgroundColor: '#B2CAB3',
      },
      {
        label: 'Duration',
        data: durations,
        borderColor: '#B8E8FC',
        backgroundColor: '#B8E8FC',
      }
    ]
  }

  const customBarState = {
    labels: timestamps,
    datasets: [
      {
        label: 'amount',
        backgroundColor: [
          '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
          ],
        borderWidth: 0,
        borderColor: 'black',
        data: durations,
        fontSize: 20,
        showLine: true,
      }
    ]
  }

  return(
    <div className="grid grid-cols-2 gap-4 p-4">
      <p className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white">
      <Bar
        data = { durationBarState }
        // width={"50%"}
        options = {{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 25,
              },
              text: 'Duration',
              color: '#bfbfbf',
              align: 'start',
              padding: {
                top: 20,
                bottom: 20
              }
            },
            legend: {
              display: false,
              position: 'right'
            }
          },
          scales: {
            y: {
              ticks: { color: '#bfbfbf' },
              title: {
                display: true,
                text: 'seconds',
                color: '#bfbfbf'
              }
            },
            x: {
              ticks: { color: '#bfbfbf' },
              title: {
                display: true,
                text: 'time',
                color: '#bfbfbf'
              }
            }
          },
        }}/>
      </p>

      <p className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white">
      <Line
          data={ memoryState }
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 25,
              },
              text: 'Memory',
              color: '#bfbfbf',
              align: 'start',
              padding: {
                top: 20,
                bottom: 20
              }
            },
            legend:{
              display: false,
              position: 'bottom'
            }
          },
          scales: {
            y: {
              ticks: { color: '#bfbfbf' },
              title: {
                display: true,
                text: 'mb',
                color: '#bfbfbf'
              }
            },
            x: {
              ticks: { color: '#bfbfbf' },
              beginAtZero: true,
              title: {
                display: true,
                text: 'time',
                color: '#bfbfbf'
              }
            }
          },
          }}/>
        </p>

      <p className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white">
      <Line
          data={ invocationState }
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 25,
              },
              text: 'Invocations',
              color: '#bfbfbf',
              align: 'start',
              padding: {
                top: 20,
                bottom: 20
              }
            },
            legend:{
              display: false,
              position: 'bottom'
            }
          },
          scales: {
            y: {
              ticks: { color: '#bfbfbf' },
              title: {
                display: true,
                text: 'count',
                color: '#bfbfbf'
              }
            },
            x: {
              ticks: { color: '#bfbfbf' },
              beginAtZero: true,
              title: {
                display: true,
                text: 'time',
                color: '#bfbfbf'
              }
            }
          },
          }}/>
        </p>

      <p className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white">
      <Line
          data={ errorState }
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 25,
              },
              text: 'Errors',
              color: '#bfbfbf',
              align: 'start',
              padding: {
                top: 20,
                bottom: 20
              }
            },
            legend:{
              display: false,
              position: 'bottom'
            }
          },
          scales: {
            y: {
              ticks: { color: '#bfbfbf' },
              title: {
                display: true,
                text: 'count',
                color: '#bfbfbf'
              }
            },
            x: {
              ticks: { color: '#bfbfbf' },
              beginAtZero: true,
              title: {
                display: true,
                text: 'time',
                color: '#bfbfbf'
              }
            }
          },
          }}/>
        </p>

      <p className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white">
      <Line
          data={ throttleState }
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 25,
              },
              text: 'Throttles',
              color: '#bfbfbf',
              align: 'start',
              padding: {
                top: 20,
                bottom: 20
              }
            },
            legend:{
              display: false,
              position: 'bottom'
            }
          },
          scales: {
            y: {
              ticks: { color: '#bfbfbf' },
              title: {
                display: true,
                text: 'count',
                color: '#bfbfbf'
              }
            },
            x: {
              ticks: {
                color: '#bfbfbf'
              },
              beginAtZero: true,
              title: {
                display: true,
                text: 'time',
                color: '#bfbfbf'
              }
            }
          },
          }}/>
        </p>

      <p className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white">
      <Line
          data={ concurrentExecState }
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 25,
              },
              text: 'Concurrent Executions',
              color: '#bfbfbf',
              align: 'start',
              padding: {
                top: 20,
                bottom: 20
              }
            },
            legend:{
              display: false,
              position: 'bottom'
            }
          },
          scales: {
            y: {
              ticks: { color: '#bfbfbf' },
              title: {
                display: true,
                text: 'count',
                color: '#bfbfbf'
              }
            },
            x: {
              ticks: { color: '#bfbfbf' },
              beginAtZero: true,
              title: {
                display: true,
                text: 'time',
                color: '#bfbfbf'
              }
            }
          },
          }}/>
        </p>

      <p className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white">
      <Line
        data = { multiState }
        options = {{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 25,
              },
              text: 'Basic Metrics',
              color: '#bfbfbf',
              align: 'start',
              padding: {
                top: 20,
                bottom: 20
              }
            }
          },
          scales: {
            y: {
              ticks: { color: '#bfbfbf' },
              title: {
                display: true,
                text: 'seconds',
                color: '#bfbfbf'
              }
            },
            x: {
              ticks: { color: '#bfbfbf' },
              title: {
                display: true,
                text: 'time',
                color: '#bfbfbf'
              }
            }
          },
        }}/>
      </p>
      
      {/* datasets: [
      {
        label: 'amount',
        backgroundColor: [
          '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
          ],
        borderWidth: 0,
        borderColor: 'black',
        data: durations,
        fontSize: 20,
        showLine: true,
      }
    ] */}
      {customGraphs && customGraphs.map((graph: any) => {
      let chartState: any = {};
      if (graph.metricName === 'Errors') chartState = errorState;
      if (graph.metricName === 'Throttles') chartState = throttleState;
      if (graph.metricName === 'ConcurrentExecutions') chartState = concurrentExecState;
      if (graph.graphType === 'Bar') {
        return (
        <div className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white"> 
        <Bar 
        data = { chartState }
        options = {{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 25,
              },
              text: graph.graphName,
              color: '#bfbfbf',
              align: 'start',
              padding: {
                top: 20,
                bottom: 20
              }
            },
            legend: {
              display: false,
              position: 'right'
            }
          },
          scales: {
            y: {
              ticks: { color: '#bfbfbf' },
              title: {
                display: true,
                text: 'seconds',
                color: '#bfbfbf'
              }
            },
            x: {
              ticks: { color: '#bfbfbf' },
              title: {
                display: true,
                text: 'time',
                color: '#bfbfbf'
              }
            }
          },
        }}/>
        </div>)
      }
  
      if (graph.graphType === 'Line') {
        return (
        <div className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white"> 
        <Line 
        data = { chartState } 
        options = {{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
          title: {
            display: true,
            font: {
              weight: 'bold',
              size: 25,
            },
            text: graph.graphName,
            color: '#bfbfbf',
            align: 'start',
            padding: {
              top: 20,
              bottom: 20
            }
          },
          legend:{
            display: false,
            position: 'bottom'
          }
        },
        scales: {
          y: {
            ticks: { color: '#bfbfbf' },
            title: {
              display: true,
              text: 'count',
              color: '#bfbfbf'
            }
          },
          x: {
            ticks: { color: '#bfbfbf' },
            beginAtZero: true,
            title: {
              display: true,
              text: 'time',
              color: '#bfbfbf'
            }
          }
        },
        }}/>
        </div>
      )}

      if (graph.graphType === 'Pie') {
        return (
        <div className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white"> 
        <Pie
        data = { chartState } 
        options = {{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 25,
              },
              text: graph.graphName,
              color: '#BEBEBE',
              align: 'start',
              padding: {
                top: 20,
                bottom: 20
              }
            },
            legend: {
              display: false,
              position: 'left'
            }
          }
        }}/>
        </div>
        )
      }
    })}
    </div>
  );
};

export default GraphComponent;