import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export function Line_ch(props) {
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
   
  },
};

const labels = props.end_year
 const data = {
  labels,
  datasets: [
    {
      label: 'Intensity',
      data: props.intensity,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Relevance',
      data: props.relevance,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Likelihood',
      data: props.likelihood,
      borderColor: 'rgb(53, 20, 25)',
      backgroundColor: 'rgba(57, 12, 25, 15)',
    },
  ],
};
// let [country, SetCountry] = React.useState([])



  return(
    <>
   
    <Line options={options} data={data} />
    </>
  ) 
}
