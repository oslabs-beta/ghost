import * as React from 'react'

/* 
choose which func to get price data
advanced test > settings for functions (post /functionConfig returns type: string, memorySize: number, runtime: string)
ask if they want to change anything (memorySize 128 - 10240 or type but currently hard coded)
post /price requires functionName, type, memorySize, storage: 512 - 10240: number, billedDurationAvg: 1ms - 900,000ms number, invocationTotal: 1 - 1 21 0's number (default to 1 million ms)
returns $ 20.21 per month
*/

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
      