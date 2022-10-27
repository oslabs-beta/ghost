import * as React from 'react'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar, Scatter, Pie, Line } from 'react-chartjs-2'
import { useGraphContext } from '../../context/GraphContext'

ChartJS.register(...registerables)

