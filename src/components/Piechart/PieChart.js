import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { AuthContext } from "../../Context/AuthContext";
const Piechart = ({ data }) => {
  const { state } = useContext(AuthContext);
  const length = data.length;
  const displayData = data.map(amount => Math.floor((amount % length) * 100));
  const settings = {
    series: state.user.admin ? displayData : data,
    options: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <Chart
        options={settings.options}
        series={settings.series}
        type="donut"
        width={450}
        height={450}
      />
    </div>
  );
};

export default Piechart;
