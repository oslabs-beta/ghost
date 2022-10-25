import * as React from 'react'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar, Scatter, Pie, Line } from 'react-chartjs-2'
import { fontSize } from '@mui/system';
import { BoltRounded } from '@mui/icons-material';

// initialize chartjs
ChartJS.register(...registerables);

// declare props
interface GraphComponentProps {
  timestamps: string[],
  durations: number[],
  memory: number[],
}

const fakeJson = {
  "data": [
    {
      "date": "2021-01-02",
      "nuts": 4,
      "butts": 11
    },{
      "date": "2021-03-30",
      "nuts": 10,
      "butts": 9
    },{
      "date": "2021-04-11",
      "nuts": 1,
      "butts": 2
    },{
      "date": "2021-06-09",
      "nuts": 9,
      "butts": 0
    },{
      "date": "2021-10-01",
      "nuts": 5,
      "butts": 5
    }, {
      "date": "2021-10-02",
      "nuts": 22,
      "butts": 2
    },{
      "date": "2021-10-10",
      "nuts": 18,
      "butts": 9
    },
  ]
}

// nuts graph
// need to take all the dates and put them in one array
// take nuts values and put them in another array

const dates: Array<string> = fakeJson.data.map((item) => item.date);
const dataset1: Array<number> = fakeJson.data.map((item) => item.nuts);
const dataset2: Array<number> = fakeJson.data.map((item) => item.butts);



const multiState = {
  labels: dates,
  datasets: [
    {
      label: 'nuts',
      data: dataset1,
      borderColor: '#B2CAB3',
      backgroundColor: '#B2CAB3',
    },
    {
      label: 'butts',
      data: dataset2,
      borderColor: '#B8E8FC',
      backgroundColor: '#B8E8FC',
    }
  ]
}



// const scatterState = {
//   datasets:[
//   { 
//     label: '',
//     backgroundColor: ['#B2CAB3'],
//     data: [
//     { x: nuts[0], y: butts[0] },
//     { x: nuts[1], y: butts[1] },
//     { x: nuts[2], y: butts[2] },
//   ],
//   }
//   ]
// }


const GraphComponent = ({ timestamps, memory, durations }: GraphComponentProps) => {
  // console.log('timestamps:', timestamps);
  // console.log('durations:', durations);
  // console.log('memory:', memory);

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


  console.log('invocationObj:', invocationObj);

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
        fontSize: 20,
        showLine: true,
      }
    ]
  }

  const durationState = {
    labels: timestamps,
    datasets: [
      {
        label: 'Data',
        data: durations,
        backgroundColor: '#9cb59d',
        borderColor: '#9cb59d',
        fill: false,
        showLine: true,
        borderWidth: 1
      }
    ]
  }

  const memoryState = {
    labels: timestamps,
    datasets: [
      {
        label: 'Memory',
        data: memory,
        backgroundColor: '#9cb59d',
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
        backgroundColor: '#9cb59d',
        borderColor: '#9cb59d',
        fill: false,
        showLine: true,
        borderWidth: 1
      }
    ]
  }

  return(
    <div className="flex flex-col p-4">
      {/* <button>Bar Graph</button> <button>Line Graph</button> <button>Pie Chart</button> */}
      <p className="bg-white text-[#bfbfbf] rounded-lg shadow-md m-2 p-4 dark:bg-[#404040] dark:text-white">
      <Bar
        data = { durationBarState }
        // width={"50%"}
        options = {{
          plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 30,
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
              title: {
                display: true,
                text: 'seconds'
              }
            },
            x: {
              title: {
                display: true,
                text: 'time'
              }
            }
          },
        }}
      />
      </p>
      <br></br>
      <p className=" bg-white rounded-lg shadow-md m-2 p-4">
      <Line
          data={ durationState }
          options={{
            // indexAxis: 'y',
            scales: {
              y: {
                title: {
                  display: true,
                  text: 'seconds'
                }
              },
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'time',
                }
              }
            },
            plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 30,
              },
              text: 'Durations',
              color: '#BEBEBE',
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
          }}
        />
        </p>
      <br></br>

      <p className=" bg-white rounded-lg shadow-md m-2 p-4">
      <Line
          data={ memoryState }
          options={{
            // indexAxis: 'y',
            scales: {
              y: {
                title: {
                  display: true,
                  text: 'mb'
                }
              },
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'time',
                }
              }
            },
            plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 30,
              },
              text: 'Memory',
              color: '#BEBEBE',
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
          }}
        />
        </p>
      <br></br>

      <p className=" bg-white rounded-lg shadow-md m-2 p-4">
      <Line
          data={ invocationState }
          options={{
            // indexAxis: 'y',
            scales: {
              y: {
                title: {
                  display: true,
                  text: 'count'
                }
              },
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'time',
                }
              }
            },
            plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 30,
              },
              text: 'Invocations',
              color: '#BEBEBE',
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
          }}
        />
        </p>
      <br></br>


      <p className=" bg-white rounded-lg shadow-md m-2 p-4">
      <Line
        data = { multiState }
        options = {{
          scales: {
            y: {
              title: {
                display: true,
                text: 'seconds'
              }
            },
            x: {
              title: {
                display: true,
                text: 'time'
              }
            }
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 30,
              },
              text: 'Double Line Chart T',
              color: '#BEBEBE',
              align: 'start',
              padding: {
                top: 20,
                bottom: 20
              }
            }
          }
        }}
      />
      </p>
      <br></br>
      {/* <p className=" bg-white rounded-lg shadow-md m-2 p-4">
      <Pie
        data = { durationBarState }
        options = {{
          plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 30,
              },
              text: 'Pie Chart Title',
              color: '#BEBEBE',
              align: 'start',
              padding: {
                top: 20,
                bottom: 20
              }
              // fontSize: 20,
            },
            legend: {
              display: true,
              position: 'left'
            }
          }
        }}
      />
      </p> */}
      {/* 
      <br></br>
      <p className=" bg-white rounded-lg shadow-md m-2 p-4">
      <Scatter
        data = { scatterState }
        options = {{
          plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 30,
              },
              text: 'Scatter Plot Title',
              color: '#BEBEBE',
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
          }
        }}
      />
      </p>*/}
    </div>
  );
};

export default GraphComponent;