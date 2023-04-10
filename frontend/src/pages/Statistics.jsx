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
  //   const label = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // const [meetingsHours, setMdata] = useState([])
  // const [meetings, setNdata] = useState([])
  // const [labels, setLabel] = useState([])
  const [data, setdata] = useState();
  useEffect(() => {
    axios.get("/getStatistics").then((res) => {
      console.log(res);
      // setdata(res.data.data.result)

      setdata({
        labels: res.data.data.result.map((data) => data.empID),
        // labels:["1",2],
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
        ],
      });
    });
  }, []);

  return (
    <div style={{ height: "500px", width: "1000px" }}>
      {data && <Chart type="bar" options={options} data={data}></Chart>}
    </div>
  );
}
