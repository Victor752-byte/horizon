"use client"
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({accounts}: DoughnutChartProps) => {
  const accountNames = accounts.map((a) => a.name);
  const balances = accounts.map((a) => a.currentBalance)
    const datap = {
        labels: accountNames,
        datasets: [
            {
                label: 'Banks',
                data: balances,
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
