import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import InvoiceService from "../../services/Invoice";
import UserService from "../../services/User";
import { Redirect } from "react-router-dom";
import NotificationService from "../Notification/NotificationService";
import Button from "../Button/Button";
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
        const invoices = res.data.data;
        setTotalInvoice(invoices.length);
        setTotalAmount(
          invoices.reduce((total, invoice) => total + invoice.amount, 0)
        );
        setLoading(false);
        return <Redirect to="/"/>
      },
      (err) => {
        setLoading(false);
      },
      () => {}
    );
  }, []);

  const deleteHandler = () => {
    UserService.deleteUserService(
      () => {},
      (res) => {
        if (res) {
          NotificationService(
            "success",
            "User Deletion",
            "User deleted successfully."
          );
          return <Redirect to="/" />;
        }
      },
      (err) => {
        NotificationService("error", "User Deletion", "User deleting failed.");
        return;
      },
      () => {}
    );
  };

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
        {!state.user.admin && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Button secondary={true} width={250} onClickHandler={deleteHandler}>
              DELETE ACCOUNT
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
