import React, { useState, useEffect } from "react";
import { Input, Form } from "antd";

const styles = {
  input: {
    marginBottom: 22,
    width: "100%",
  },
};

const InputField = ({
  size = "large",
  placeholder = "",
  type = "text",
  value = "",
  validation = () => {},
  onChangeHander = () => {},
}) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    setText(value);
  }, [value]);
  const onChange = (event) => {
    setText(event.target.value);
    onChangeHander(event.target.value);
  };
  const blurHandler = () => {
    setTimeout(() => {
      validation(text) === true ? setError(false) : setError(validation(text));
    }, 500);
  };
  return (
    <div>
      <Input
        style={styles.input}
        size={size}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={blurHandler}
      />
      {(error) && (
        <div style={{ float: "left", color: "tomato" }}>
          {" "}
          <p styles={{ marginTop: -1 }}>{error}</p>
        </div>
      )}
    </div>
  );
};

export default InputField;
