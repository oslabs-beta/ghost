// import * as React from 'react'
// import { Chart as ChartJS, registerables } from 'chart.js'
// import { Bar, Scatter, Pie, Line } from 'react-chartjs-2'
// import { useGraphContext } from '../../context/GraphContext'

// ChartJS.register(...registerables)


// DOUBLE LINE GRAPH STATE
// const multiState = {
//   labels: timestamps,
//   datasets: [
//     {
//       label: 'Memory Used',
//       data: memory,
//       borderColor: '#B2CAB3',
//       backgroundColor: '#B2CAB3',
//     },
//     {
//       label: 'Duration',
//       data: durations,
//       borderColor: '#B8E8FC',
//       backgroundColor: '#B8E8FC',
//     }
//   ]
// }




// DOUBLE LINE GRAPH
// <p className="bg-white text-[#bfbfbf] h-80 rounded-lg shadow-md m-2 p-2 dark:bg-[#404040] dark:text-white">
//       <Line
//         data = { multiState }
//         options = {{
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               position: 'top',
//             },
//             title: {
//               display: true,
//               font: {
//                 weight: 'bold',
//                 size: 25,
//               },
//               text: 'Basic Metrics',
//               color: '#bfbfbf',
//               align: 'start',
//               padding: {
//                 top: 20,
//                 bottom: 20
//               }
//             }
//           },
//           scales: {
//             y: {
//               ticks: { color: '#bfbfbf' },
//               title: {
//                 display: true,
//                 text: 'seconds',
//                 color: '#bfbfbf'
//               }
//             },
//             x: {
//               ticks: { color: '#bfbfbf' },
//               title: {
//                 display: true,
//                 text: 'time',
//                 color: '#bfbfbf'
//               }
//             }
//           },
//       }}/>
//  </p>