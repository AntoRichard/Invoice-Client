import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import InvoiceService from "../../services/Invoice";
import Loader from "../Loader/Loader";
import fmt from "indian-number-format";
import "./Profile.css";

const Profile = () => {
  const { state } = useContext(AuthContext);
  const [totalInvoice, setTotalInvoice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    InvoiceService.getInvoices(
      () => {
        setLoading(true);
      },
      (res) => {
        console.log(res.data.data);
        const invoices = res.data.data;
        setTotalInvoice(invoices.length);
        setTotalAmount(invoices.reduce((total, invoice) => total + invoice.amount, 0));
        setLoading(false);
      },
      (err) => {
        console.log(err);
        setLoading(false);
      },
      () => {}
    );
  }, []);

  console.log({ state });
  if (loading) return <Loader show={loading} />;
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div style={{ textAlign: "center" }}>
          <h1>Profile</h1>
          <hr />
        </div>
        <div style={{ marginTop: 20, marginLeft: 20 }}>
          <p>
            Username: <h4>{state.user.username}</h4>{" "}
          </p>
          <p>
            Email: <h4>{state.user.email}</h4>{" "}
          </p>
          <p>
            No of invoices:<h4>{totalInvoice}</h4>{" "}
          </p>
          <p>
            Total amount: <h4>Rs.{fmt.format(totalAmount)}</h4>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
