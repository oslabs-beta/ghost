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
  invocationsMore: any,
  durationMore: any,
  urlRequestCount: any
}

const customGwaphs = () => {
    
}


const GraphComponent = ({ timestamps, memory, durations, errors, throttles, concurrentExecutions, invocationsMore, durationMore, urlRequestCount }: GraphComponentProps) => {
  const { customGraphs, metricData } = useGraphContext();
  const { functionName } = useFunctionContext();

  // manually counting invocations - can probably do away w/ this now that we have invocations from the back end
  const invocationObj: any = {};
  for (let i = 0; i < timestamps.length; i++) {
    if (invocationObj[timestamps[i]]) {
      invocationObj[timestamps[i]] += 1;
    } else {
      invocationObj[timestamps[i]] = 1;
    }
  }

  const invocations = Object.values(invocationObj);
  const singleTime = Object.keys(invocationObj);



  // metricData.Datapoints.sort((a:any, b:any) => a.Timestamp.localeCompare(b.Timestamp));



  errors.sort((a: any, b: any) => a.Timestamp.localeCompare(b.Timestamp));
  const errorTimestamps: Array<string> = errors.map((item: any) => item.Timestamp.slice(-11));
  const errorCounts: Array<number> = errors.map((item: any) => item.Sum);
  const errorLabels: Array<string> = errors.map((item: any) => item.Unit);

  throttles.sort((a: any, b: any) => a.Timestamp.localeCompare(b.Timestamp));
  const throttleTimestamps: Array<string> = throttles.map((item: any) => item.Timestamp.slice(-11));
  const throttleCounts: Array<number> = throttles.map((item: any) => item.Maximum);
  const throttleLabels: Array<string> = throttles.map((item: any) => item.Unit);

  concurrentExecutions.sort((a: any, b: any) => a.Timestamp.localeCompare(b.Timestamp));
  const concurrentTimestamps: Array<string> = concurrentExecutions.map((item: any) => item.Timestamp.slice(-11));
  const concurrentCounts: Array<number> = concurrentExecutions.map((item: any) => item.Maximum);
  const concurrentLabels: Array<string> = concurrentExecutions.map((item: any) => item.Unit);

  invocationsMore.sort((a: any, b: any) => a.Timestamp.localeCompare(b.Timestamp));
  const invocationsMoreTimestamps: Array<string> = invocationsMore.map((item: any) => item.Timestamp.slice(-11));
  const invocationsMoreCounts: Array<number> = invocationsMore.map((item: any) => item.Sum);
  const invocationsMoreLabels: Array<string> = invocationsMore.map((item: any) => item.Unit);

  durationMore.sort((a: any, b: any) => a.Timestamp.localeCompare(b.Timestamp));
  const durationMoreTimestamps: Array<string> = durationMore.map((item: any) => item.Timestamp.slice(-11));
  const durationMoreCounts: Array<number> = durationMore.map((item: any) => item.Average);
  const durationMoreLabels: Array<string> = durationMore.map((item: any) => item.Unit);

  urlRequestCount.sort((a: any, b: any) => a.Timestamp.localeCompare(b.Timestamp));
  const urlRequestTimestamps: Array<string> = urlRequestCount.map((item: any) => item.Timestamp.slice(-11));
  const urlRequestCounts: Array<number> = urlRequestCount.map((item: any) => item.Sum);
  const urlRequestLabels: Array<string> = urlRequestCount.map((item: any) => item.Unit);

  const durationBarState = {
    labels: timestamps,
    datasets: [
      {
        label: 'Duration',
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

  // const errorState = {
  //   labels: errorTimestamps,
  //   datasets: [
  //     {
  //       label: 'Errors',
  //       data: errorCounts,
  //       backgroundColor: [
  //         '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
  //         ],
  //       borderColor: '#9cb59d',
  //       fill: false,
  //       showLine: true,
  //       borderWidth: 1
  //     }
  //   ]
  // }

  // const throttleState = {
  //   labels: throttleTimestamps,
  //   datasets: [
  //     {
  //       label: 'Throttles',
  //       data: throttleCounts,
  //       backgroundColor: [
  //         '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
  //         ],
  //       borderColor: '#9cb59d',
  //       fill: false,
  //       showLine: true,
  //       borderWidth: 1
  //     }
  //   ]
  // }

  // const concurrentExecState = {
  //   labels: concurrentTimestamps,
  //   datasets: [
  //     {
  //       label: 'Concurrent Executions',
  //       data: concurrentCounts,
  //       backgroundColor: [
  //         '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
  //         ],
  //       borderColor: '#9cb59d',
  //       fill: false,
  //       showLine: true,
  //       borderWidth: 1
  //     }
  //   ]
  // }

  // const invocationsMoreState = {
  //   labels: invocationsMoreTimestamps,
  //   datasets: [
  //     {
  //       label: 'Invocations',
  //       data: invocationsMoreCounts,
  //       backgroundColor: [
  //         '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
  //         ],
  //       borderColor: '#9cb59d',
  //       fill: false,
  //       showLine: true,
  //       borderWidth: 1
  //     }
  //   ]
  // }

  // const durationMoreState = {
  //   labels: durationMoreTimestamps,
  //   datasets: [
  //     {
  //       label: 'Durations',
  //       data: durationMoreCounts,
  //       backgroundColor: [
  //         '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
  //         ],
  //       borderColor: '#9cb59d',
  //       fill: false,
  //       showLine: true,
  //       borderWidth: 1
  //     }
  //   ]
  // }

  // const urlState = {
  //   labels: urlRequestTimestamps,
  //   datasets: [
  //     {
  //       label: 'Durations',
  //       data: urlRequestCounts,
  //       backgroundColor: [
  //         '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
  //         ],
  //       borderColor: '#9cb59d',
  //       fill: false,
  //       showLine: true,
  //       borderWidth: 1
  //     }
  //   ]
  // }

 


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
                text: 'milliseconds',
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

      {/* <p className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white">
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
        </p> */}

      
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

      {/* {customGraphs && customGraphs.filter((graph: any) => graph.functionName === functionName).map((graph: any, index: number) => {
        if (graph.graphType === 'Bar') {
          return (
          <div className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white"> 
          <Bar 
          data = { memoryState }
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
                  text: 'hi',
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
          data = { memoryState } 
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
                text: 'Meow',
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
          data = { memoryState } 
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
  })} */}

    {customGraphs && customGraphs.filter((graph: any) => graph.functionName === functionName).map((graph: any, index: number) => {
      // extract the label from the metric data
      const label = graph.metricData.Label;
      
      // sort the datapoints by time
      graph.metricData.Datapoints.sort((a: any, b: any) => a[1] - b[1]);

      // extract time & data from each datapoint
      const timestamps = graph.metricData.Datapoints.map((item: any) => item.Timestamp.slice(-11)); // removes date from string
      const sums = graph.metricData.Datapoints.map((item:any) => item.Sum);
      const average = graph.metricData.Datapoints.map((item:any) => item.Average);
      const max = graph.metricData.Datapoints.map((item:any) => item.Maximum);
      const min = graph.metricData.Datapoints.map((item:any) => item.Minimum);

      // states for most graphs
      const state = {
        labels: timestamps,
        datasets: [
          {
            label: label,
            backgroundColor: [
              '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
              ],
            borderWidth: 0,
            borderColor: 'black',
            data: sums,
            showLine: true,
          }
        ]
      }

       // MULTI LINE GRAPH STATE
      const multiState = {
        labels: timestamps,
        datasets: [
          {
            label: 'Maximum',
            data: max,
            borderColor: '#B2CAB3',
            backgroundColor: '#B2CAB3',
          },
          {
            label: 'Minimum',
            data: min,
            borderColor: '#B8E8FC',
            backgroundColor: '#B8E8FC',
          },
          {
            label: 'Average',
            data: average,
            borderColor: '#EDC09E',
            backgroundColor: '#EDC09E',
          }
        ]
      }

      // if conditionals for each graph type
      if (graph.graphType === 'Bar') {
        return (
          <div className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white">
          <Bar
            data = { state }
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
                    text: label,
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
          </div>
        )
      }
      if (graph.graphType === 'Line') {
        return (
          <div className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white">
          <Line
              data={ state }
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
                    text: label,
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
        );
      }
      if (graph.graphType === 'Pie') {
        return (
          <div className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white"> 
          <Pie
          data = { state } 
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
        );
      }
      if (graph.graphType === 'MultiLine') {
        return (
          <div className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white">
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
                  text: graph.graphName,
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
                    text: label,
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
          </div>
        );
      }
    }
  )}
  </div>
  );
}

export default GraphComponent;