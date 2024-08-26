"use client"
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({accounts}: DoughnutChartProps) => {
    const datap = {
        labels: ['Bank 1', 'Bank 2', 'Bank 3'],
        datasets: [
            {
                label: 'Banks',
                data: [1250, 2500, 3750],
                backgroundColor: ['#0747b6', '#2265d8', '#2f91fa'],
            }
        ],
    }
    const options={
      cutout: '60%',
      plugins: {
        legend: {
          display: false
        }
      }
    }
  return (
  
      <Doughnut data={datap} options={options}/>
    
  )
}

export default DoughnutChart
