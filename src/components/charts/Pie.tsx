// import * as React from 'react'
import { Chart as ChartJS, registerables } from 'chart.js';
// import { Bar, Scatter, Pie, Line } from 'react-chartjs-2'
// import { useGraphContext } from '../../context/GraphContext'

ChartJS.register(...registerables);

/*

const BarChart = ({ chartState, graphName }) => {
  return
  (
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
)}

*/
