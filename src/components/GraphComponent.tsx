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
}

const GraphComponent = ({ timestamps, memory, durations }: GraphComponentProps) => {
  const { customGraphs } = useGraphContext();
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

  // state for the default graphs
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

  return(
    <div className="grid grid-cols-2 gap-4 p-4">
      <p className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white">
      <Bar
        data = { durationBarState }
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
                top: 15,
              }
            },
            subtitle: {
              display: true,
              text: 'Put the date here',
              color: '#bfbfbf',
              align: 'start',
              padding: {
                bottom: 25
              },
              font: {
                size: 15,
                style: 'italic',
                weight: 'normal'
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
                top: 15,
              }
            },
            subtitle: {
              display: true,
              text: 'Put the date here',
              color: '#bfbfbf',
              align: 'start',
              padding: {
                bottom: 25
              },
              font: {
                size: 15,
                style: 'italic',
                weight: 'normal'
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
                top: 15,
              }
            },
            subtitle: {
              display: true,
              text: 'Put the date here',
              color: '#bfbfbf',
              align: 'start',
              padding: {
                bottom: 25
              },
              font: {
                size: 15,
                style: 'italic',
                weight: 'normal'
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
                text: 'Time',
                color: '#bfbfbf'
              }
            }
          },
          }}/>
        </p>

    {customGraphs ? customGraphs.filter((graph: any) => graph.functionName === functionName).map((graph: any, index: number) => {
      if (!graph.metricData) return null;
      
      // extract the label from the metric data
      const label = graph.metricData.Label;
      
      // sort the datapoints by time
      const sortedGraph = graph.metricData.Datapoints.sort((a: any, b: any) => a.Timestamp.localeCompare(b.Timestamp));

      // extract time & data from each datapoint
      const date = graph.metricData.Datapoints[0].Timestamp.slice(0, 10); // grabs date from string
      const timestamps = sortedGraph.map((item: any) => item.Timestamp.slice(-11)); // removes date from string
      const sums = sortedGraph.map((item:any) => item.Sum);
      const average = sortedGraph.map((item:any) => item.Average);
      const max = sortedGraph.map((item:any) => item.Maximum);
      const min = sortedGraph.map((item:any) => item.Minimum);
      const units = graph.metricData.Datapoints[0].Unit;

      // states for most graphs
      const state = {
        labels: timestamps,
        datasets: [
          {
            label: units,
            backgroundColor: [
              '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
              ],
            borderWidth: 1,
            borderColor: '#B2CAB3',
            data: sums,
            showLine: true,
            spanGaps: true,
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
          },
          {
            label: 'Sum',
            data: sums,
            borderColor: '#FDFDBD',
            backgroundColor: '#FDFDBD',
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
                    top: 15,
                  }
                },
                subtitle: {
                  display: true,
                  text: label,
                  color: '#bfbfbf',
                  align: 'start',
                  padding: {
                    bottom: 25
                  },
                  font: {
                    size: 15,
                    style: 'italic',
                    weight: 'normal'
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
                    text: units,
                    color: '#bfbfbf'
                  }
                },
                x: {
                  ticks: { color: '#bfbfbf' },
                  title: {
                    display: true,
                    text: 'Time',
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
                spanGaps: true,
                showLine: true,
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
                    top: 15,
                  }
                },
                subtitle: {
                  display: true,
                  text: `${date}: ${label}`,
                  color: '#bfbfbf',
                  align: 'start',
                  padding: {
                    bottom: 25
                  },
                  font: {
                    size: 15,
                    style: 'italic',
                    weight: 'normal'
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
                    text: units,
                    color: '#bfbfbf'
                  }
                },
                x: {
                  ticks: { color: '#bfbfbf' },
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Time',
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
                  top: 15,
                }
              },
              subtitle: {
                display: true,
                text: `${date}: ${label}`,
                color: '#bfbfbf',
                align: 'start',
                padding: {
                  bottom: 25
                },
                font: {
                  size: 15,
                  style: 'italic',
                  weight: 'normal'
                }
              },
              legend: {
                display: true,
                position: 'left',
                labels: {
                  color: '#bfbfbf'
                }
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
                  display: true,
                  position: 'top',
                  labels: {
                    color: '#bfbfbf'
                  }
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
                    top: 15,
                  }
                },
                subtitle: {
                  display: true,
                  text: `${date}: ${label}`,
                  color: '#bfbfbf',
                  align: 'start',
                  padding: {
                    bottom: 25
                  },
                  font: {
                    size: 15,
                    style: 'italic',
                    weight: 'normal'
                  }
                },
              },
              scales: {
                y: {
                  ticks: { color: '#bfbfbf' },
                  title: {
                    display: true,
                    text: units,
                    color: '#bfbfbf'
                  }
                },
                x: {
                  ticks: { color: '#bfbfbf' },
                  title: {
                    display: true,
                    text: 'Time',
                    color: '#bfbfbf'
                  }
                }
              },
            }}/>
          </div>
        );
      }
    }
  ) : null}
  </div>
  );
}

export default GraphComponent;