//This module displays the statistics of the amount of Manhours spent by the executives 
//and the number of meetings they have attended along with average time spent per meeting
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export default function Statistics() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    plugins: {
      title: {
        display: true,
        text: " Time Spent by All Executives",
      },
    },
    responsive: true,

    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
  };

  const [data, setdata] = useState();
  useEffect(() => {
    axios.get("/getStatistics").then((res) => {


      setdata({
        labels: res.data.data.result.map((data) => data.empID),
     
        datasets: [
          {
            label: "Work Hours",
            data: res.data.data.result.map((data) => data.WorkHours),
            backgroundColor: "rgb(255, 99, 132)",
          },
          {
            label: "Total Meetings",
            data: res.data.data.result.map((data) => data.meetingNum),
            backgroundColor: "rgb(75, 192, 192)",
          },
          {
            label: "Avg Time Spent Per meeting",
            data: res.data.data.result.map((data) => data.WorkHours/data.meetingNum),
            backgroundColor: "rgb(75, 0, 192)",
          },
        ],
      });
    });
  }, []);

  return (
    <div className="w-3/4 mx-auto mt-20 mb-10 flex justify-center items-center">
      {data && <Chart type="bar" options={options} data={data}></Chart>}
    </div>
  );
}
