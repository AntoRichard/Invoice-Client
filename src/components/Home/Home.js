import React, { useContext, useState, useEffect } from "react";
import UserDetails from "../UserDetails/UserDetails";
import Invoices from "../Invoices/Invoices";
import { FormOutlined } from "@ant-design/icons";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const { state, } = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  
  return (
    <div style={{backgroundColor: "red"}}>
      <div className="customer-detail-container">
        <UserDetails amount={amount} />
        <Invoices setAmount={(amount) => setAmount(amount)} />
      </div>
      {!state.user.admin && (
        <div className="create-invoice">
          <Link to="/dashboard/create">
            <FormOutlined
              style={{ color: "white", fontSize: 26, paddingTop: 12 }}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
