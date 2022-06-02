import React from 'react'
import { Bar } from "react-chartjs-2";
import { createContext, useState, useEffect } from "react";
import { CategoryScale } from 'chart.js';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
function BarChar() {
    // set data
    const [barData, setBarData] = useState({
        labels: ['label 1', 'label 2', 'label 3', 'label 4'],
        datasets: [
            {
                label: 'test label',
                data: [
                    48,
                    35,
                    73,
                    82
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderWidth: 3
            }
        ]
    });
    // set options
    const [barOptions, setBarOptions] = useState({
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            },
            title: {
                display: true,
                text: 'Data Orgranized In Bars',
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    });

    // return JSX
    return (
        <div className="BarExample">
            <Bar
                data={barData}
                options={barOptions} />
        </div>
    );
}
export default BarChar