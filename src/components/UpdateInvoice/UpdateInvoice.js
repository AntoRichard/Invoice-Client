import React, { useState, useEffect } from "react";
import { notification } from "antd";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import InvoiceApi from "../../services/Invoice";
import { checkName, checkAmount } from "../../Validation/Validation";
import { withRouter } from "react-router-dom";
const styles = {
  input: {
    marginBottom: 22,
    width: "100%",
  },
};

const UpdateInvoice = (props) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const id = props.match.params.id;
    InvoiceApi.getOneInvoices(
      id,
      () => {},
      (res) => {
        const { data } = res.data;
        setName(data[0].name);
        setAmount(data[0].amount);
        setDate(data[0].date);
      },
      (err) => {
        props.history.push("/");
        console.log(err);
      },
      () => {}
    );
  }, []);
  const openNotification = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };
  const onClickHandler = () => {
    if (checkName(name) === true && checkAmount(amount) === true) {
      const payload = { name, amount, id: props.match.params.id };
      InvoiceApi.patchInvoice(
        payload,
        () => {},
        (res) => {
          if (res.data.success) {
            openNotification(
              "success",
              "Invoice",
              "Invoice updated successfully."
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
        <h1 className="create-invoice-title">Update Invoice</h1>
        <div className="create-invoice-form">
          <InputField
            placeholder="Enter Invoice Name"
            value={name}
            onChangeHander={(value) => setName(value)}
            validation={checkName}
          />
          <InputField
            placeholder="Enter Invoice Amount"
            type="number"
            value={amount}
            onChangeHander={(value) => setAmount(value)}
            validation={checkAmount}
          />
          {/* <DatePicker
            size="large"
            style={styles.input}
            disabled={true}
            defaultValue={moment(new Date(date), "YYY-MM-DD")}
          /> */}
          <Button width={"100%"} onClickHandler={onClickHandler}>
            Update Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UpdateInvoice);
