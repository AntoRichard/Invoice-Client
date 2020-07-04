import React, { useEffect, useState, useContext } from "react";
import InvoiceService from "../../services/Invoice";
import Barchat from "../Barchart/Barchart";
import Loader from "../Loader/Loader";
import moment from "moment";
import "./Metric.css";
import Piechart from "../Piechart/PieChart";
import fmt from "indian-number-format";
import { AuthContext } from "../../Context/AuthContext";
import UsersInvoice from "../UsersInvoice/UsersInvoice";
import { withRouter } from 'react-router-dom';

const Metric = () => {
  const [invoices, setInvoices] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState("");
  const [pieChart, setPieChart] = useState([]);
  const [total, setTotal] = useState(0);
  const { state } = useContext(AuthContext);

  const getInvoiceData = (props) => {
    InvoiceService.getInvoices(
      () => {
        setLoading(true);
      },
      (res) => {
        setInvoices(res.data.data);
      },
      (err) => {
        console.error(err);
        props.history.push("/");
      },
      () => {
        setLoading(false);
      }
    );
  };

  const calculate = () => {
    const barhchart = {};
    const barchart2 = {};
    let amount = [];
    let totalAmount = 0;
    // Extract date and number of invoices
    invoices.forEach((invoice) => {
      let currentDate = moment(invoice.date).format("MMM DD,YYYY");
      if (barhchart[currentDate] > 0) {
        barhchart[currentDate] += 1;
      } else {
        barhchart[currentDate] = 1;
      }
      amount.push(invoice.amount);
      totalAmount = totalAmount + invoice.amount;
    });
    setChartData(barhchart);
    // Extract amount
    setPieChart(amount);
    setTotal(totalAmount);
  };
  useEffect(() => {
    getInvoiceData();
  }, []);

  useEffect(() => {
    calculate();
  }, [invoices]);

  if (loading) return <Loader show={loading} />;
  return (
    <div className="metric-container">
      <div className="pie-chart-container">
        <div className="pie-chart-details">
          <div className="pie-chart-card">
            <h2>Total Invoices</h2>
            <p>{invoices.length}</p>
          </div>
          <div className="pie-chart-card">
            <h2>Total Amount</h2>
            <p>Rs. {fmt.format(total)}</p>
          </div>
        </div>
        <div className="pie-chart-details">
          <div className="pie-chart">
            <Piechart data={pieChart} />
          </div>
        </div>
      </div>

      <div className="card-container" style={{ marginBottom: 50 }}>
        <div className="invoice-card">
          <Barchat data={chartData} title="Date and Invoice" />
        </div>
      </div>
      {state.user.admin && <UsersInvoice invoicesProp={invoices} />}
    </div>
  );
};

export default withRouter(Metric);
