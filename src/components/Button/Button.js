import React from "react";
import { Button } from "antd";

const UIButton = ({
  secondary = false,
  label = "",
  children,
  onClickHandler,
  type = "button",
  width = 375,
  disabled = false ,
}) => {
  const styles = {
    color: secondary ? "#ff0000" : "#ffffff",
    backgroundColor: secondary ? "#ffffff" : "#0e2659",
    width: width,
  };
  return (
    <Button
      size="large"
      htmlType={type}
      style={styles}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {children || label}
    </Button>
  );
};

export default UIButton;
