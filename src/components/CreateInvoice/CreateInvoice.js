import React, { useState } from "react";
import { DatePicker, notification } from "antd";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import moment from "moment";
import InvoiceApi from "../../services/Invoice";
import { checkInvoiceName, checkAmount } from "../../Validation/Validation";

import "./CreateInvoice.css";

const styles = {
  input: {
    marginBottom: 22,
    width: "100%",
  },
};

const CreateInvoice = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(moment(new Date(), "DD-MM-YYYY"));

  const openNotification = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };
  const onClickHandler = () => {
    if (checkInvoiceName(name) === true && checkAmount(amount) === true) {
      const payload = { name, amount, date };
      InvoiceApi.postInvoice(
        payload,
        () => {},
        (res) => {
          if (res.data.success) {
            openNotification(
              "success",
              "Invoice",
              "Invoice created successfully."
            );
          }
        },
        (err) => {
          let text = `Failed to create Invoice.`;
          openNotification("error", "Invoice", text);
        },
        () => {
          setName("");
          setAmount("");
          setDate(moment(new Date(), "DD-MM-YYYY"));
        }
      );
    } else {
      openNotification(
        "error",
        "Error Notification",
        "valid data should be entered in Invoice name and amount."
      );
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div className="create-invoice-conainer">
        <h1 className="create-invoice-title">Create Invoice</h1>
        <div className="create-invoice-form">
          <InputField
            placeholder="Enter Invoice Name"
            value={name}
            onChangeHander={value => setName(value)}
            validation={checkInvoiceName}
          />
          <InputField
            placeholder="Enter Invoice Amount"
            type="number"
            value={amount}
            onChangeHander={value => setAmount(value)}
            validation={checkAmount}
          />
          <DatePicker
            size="large"
            style={styles.input}
            onChange={(date, dateString) => setDate(moment(new Date(dateString), "DD-MM-YYYY"))}
            defaultValue={moment(new Date(), "DD-MM-YYYY")}
            value={date}
          />
          <Button width={"100%"} onClickHandler={onClickHandler}>
            Create Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
