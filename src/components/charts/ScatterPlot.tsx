/*

// SCATTER PLOT
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
</p>

// MULTI LINE GRAPH STATE
  const multiState = {
    labels: timestamps,
    datasets: [
      {
        label: 'Maximum',
        data: memory,
        borderColor: '#B2CAB3',
        backgroundColor: '#B2CAB3',
      },
      {
        label: 'Minimum',
        data: durations,
        borderColor: '#B8E8FC',
        backgroundColor: '#B8E8FC',
      },
      {
        label: 'Average',
        data: durations,
        borderColor: '#B8E8FC',
        backgroundColor: '#B8E8FC',
      }
    ]
  }

// DOUBLE LINE GRAPH
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

*/
