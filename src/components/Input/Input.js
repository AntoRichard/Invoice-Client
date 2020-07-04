import React, { useState } from "react";
import { Input, Form } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import "./Input.css";

const InputField = ({
  size = "large",
  placeholder = "",
  icon,
  onBlurHandler,
  password,
  value = "",
  validation = () => {},
}) => {
  const [text, setText] = useState(value);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const ModifiedInput = password ? Input.Password : Input;
  const blurHandler = () => {
    if (validation(text) === true) {
      setError(false);
      return onBlurHandler(text);
    } 
    setError(true);
    setErrorMessage(validation(text));
  };
  return (
    <Form.Item>
      <ModifiedInput
        size={size}
        placeholder={placeholder}
        prefix={icon}
        onChange={(e) => setText(e.target.value)}
        value={text}
        onBlur={blurHandler}
      />
      {error && <div className="input-error">{errorMessage}</div>}
    </Form.Item>
  );
};

export default InputField;
