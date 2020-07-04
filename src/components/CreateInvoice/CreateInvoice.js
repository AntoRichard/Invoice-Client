import React, { useState } from "react";
import { DatePicker, notification, Input, Form } from "antd";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import moment from "moment";
import InvoiceApi from "../../services/Invoice";
import { checkName, checkAmount } from "../../Validation/Validation";

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
  const openNotification = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };
  const onClickHandler = () => {
    if (checkName(name) === true && checkAmount(amount) === true) {
      const payload = { name, amount };
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
          setName("");
          setAmount("");
        },
        (err) => {
          let text = `Failed to create Invoice.`;
          openNotification("error", "Invoice", text);
        },
        () => {}
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
            validation={checkName}
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
            disabled={true}
            defaultValue={moment(new Date(), "YYYY-MM-DD")}
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
