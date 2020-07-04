import React from "react";
import Chart from "react-apexcharts";
import "./Barchart.css";

const Barchat = ({ data, title }) => {
  const dates = Object.keys(data);
  const numberOfInvoices = Object.values(data);

  const options = {
    chart: {
      height: 450,
      width: "100%",
      type: "bar",
      backgroundColor: "white",
    },
    xaxis: {
      categories: dates,
      gridLineWidth: 0,
    },
    fill: {
      colors: ["#0e2659"],
    },
    dataLables: {
      enabled: false,
    },
    title: {
      text: title,
      align: "center",
      margin: 20,
      offsetY: 20,
      style: {
        fontSize: "25px",
      },
    },
  };
  const series = [
    {
      name: "Number of Invoices",
      data: numberOfInvoices,
      gridLineWidth: 0,
    },
  ];
  return (
    <div>
      
      <div>
        <Chart
          options={options}
          series={series}
          type="bar"
          width={650}
          height={500}
        />
      </div>
    </div>
  );
};

export default Barchat;
