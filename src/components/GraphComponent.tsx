import * as React from 'react'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar, Scatter, Pie, Line } from 'react-chartjs-2'
import { fontSize } from '@mui/system';
import { BoltRounded } from '@mui/icons-material';

ChartJS.register(...registerables);

const state = {
  labels: [
    'bing', 'bong', 'bang', 'boom', 'blem'
    ],
  datasets: [
    {
      label: 'amount',
      backgroundColor: [
        '#B2CAB3', '#B8E8FC', '#F8C4B4', '#FDFDBD', '#9cb59d'
        ],
      borderWidth: 0,
      borderColor: 'black',
      data: [7, 23, 16, 10, 15],
      fontSize: 20,
      showLine: true
    }
  ]
}

const scatterState = {
  datasets: [
    {
      label: '',
      backgroundColor: ['#B2CAB3'],
      data: [
        { x: -4, y: 0 }, 
        { x: 0, y: 10 }, 
        { x: 6, y: 4 }, 
        { x: -6, y: 6 }, 
        { x: -8, y: 2 }, 
        { x: -2, y: 8 }, 
        { x: 4, y: 1 }, 
        { x: 0.5, y: 5.5 }
      ],
    }
  ]
}

const lineState = {
  labels: [
    'bing', 'bong', 'bang', 'boom', 'blem', 'blup', 'boop'
    ],
  datasets: [{
    // axis: 'x',
    label: 'Data',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: '#9cb59d',
    borderColor: '#9cb59d',
    fill: false,
    showLine: true,
    borderWidth: 1
  }]
}

const GraphComponent = () => {

  return(
    <div className="flex flex-col p-4">
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
              // fontSize: 20,
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
    </div>
  );
};

export default GraphComponent;