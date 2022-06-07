import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
export function Web(props) {
    let sum_intensity = props.intensity.reduce((partialSum, a) => partialSum + a, 0);
    let sum_relevance = props.relevance.reduce((partialSum, a) => partialSum + a, 0);
    let sum_likelihood = props.likelihood.reduce((partialSum, a) => partialSum + a, 0);
 
 const data = {
  
  labels: ['intensity' ,'Relevance', 'Liklihood'],
  datasets: [
    {
      label: 'Magnitude',
      data: [sum_intensity,sum_likelihood, sum_relevance],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
};


  return <PolarArea data={data} />;
}
