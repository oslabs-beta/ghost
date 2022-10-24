import * as React from 'react'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar, Scatter, Pie, Line } from 'react-chartjs-2'
import { fontSize } from '@mui/system';
import { BoltRounded } from '@mui/icons-material';

ChartJS.register(...registerables);

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

const state = {
  labels: dates,
  datasets: [
    {
      label: 'amount',
      backgroundColor: [
        '#B2CAB3', '#B8E8FC', '#EDC09E', '#FDFDBD', '#9cb59d', '#FFCACA', '#D2DAFF'
        ],
      borderWidth: 0,
      borderColor: 'black',
      data: dataset1,
      fontSize: 20,
      showLine: true
    }
  ]
}

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

const lineState = {
  labels: dates,
  datasets: [
    {
      label: 'Data',
      data: dataset1,
      backgroundColor: '#9cb59d',
      borderColor: '#9cb59d',
      fill: false,
      showLine: true,
      borderWidth: 1
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


const GraphComponent = () => {

  return(
    <div className="flex flex-col p-4">
      {/* <button>Bar Graph</button> <button>Line Graph</button> <button>Pie Chart</button> */}
      <p className=" bg-white rounded-lg shadow-md m-2 p-4">
      <Bar
        data = { state }
        // width={"50%"}
        options = {{
          // maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 30,
              },
              text: 'Bar Graph Title',
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
      </p>
      <br></br>
      <p className=" bg-white rounded-lg shadow-md m-2 p-4">
      <Line
          data={ lineState }
          
          options={{
            // indexAxis: 'y',
            scales: {
              x: {
                beginAtZero: true
              }
            },
            plugins: {
            title: {
              display: true,
              font: {
                weight: 'bold',
                size: 30,
              },
              text: 'Line Graph Title',
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
          }
          }}
        />
        </p>
      <br></br>
      <p className=" bg-white rounded-lg shadow-md m-2 p-4">
      <Line
        data = { multiState }
        options = {{
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
      <p className=" bg-white rounded-lg shadow-md m-2 p-4">
      <Pie
        data = { state }
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
      </p>
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