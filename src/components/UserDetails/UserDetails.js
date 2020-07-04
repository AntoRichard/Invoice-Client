import ftm from "indian-number-format";
import moment from "moment";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./UserDetails.css";

const UserDetails = ({ amount }) => {
  const { state } = useContext(AuthContext);
  const { username, admin } = state.user;
  return (
    <div className="customer-details">
      <div className="customer-name">
        {!admin && <p>CUSTOMER</p>}
        <h2>{username[0].toUpperCase() + username.slice(1)}</h2>
      </div>
      <div className="secondary-details">
        <div className="customer-amount" style={{ paddingRight: 15 }}>
          <p>TOTAL AMOUNT</p>
          <h2>Rs. {ftm.format(amount)}</h2>
        </div>
        <div className="customer-date">
          <p>DATE</p>
          <h2>{moment(new Date()).format("DD-MM-YYYY")}</h2>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
