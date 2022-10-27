// import * as React from 'react'
// import { Chart as ChartJS, registerables } from 'chart.js'
// import { Bar, Scatter, Pie, Line } from 'react-chartjs-2'
// import { useGraphContext } from '../../context/GraphContext'

// ChartJS.register(...registerables)

// interface Props {
//   graphName: string,
//   chartState: any
// }

// const BarChart = ({ chartState, graphName }) => {
//   return 
//         (
//           <p className="basis-1/2 bg-white text-[#bfbfbf] rounded-lg shadow-md m-2 p-4 dark:bg-[#404040] dark:text-white">
//         <Bar 
//         data = { chartState }
//         options = {{
//           plugins: {
//             title: {
//               display: true,
//               font: {
//                 weight: 'bold',
//                 size: 30,
//               },
//               text: graphName,
//               color: '#bfbfbf',
//               align: 'start',
//               padding: {
//                 top: 20,
//                 bottom: 20
//               }
//             },
//             legend: {
//               display: false,
//               position: 'right'
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
//         }}/>
//         </p>
//         )
        
// }

// export default BarChart;