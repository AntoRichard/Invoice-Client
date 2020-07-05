import React, { useState } from "react";
import "./Signup.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import User from "../../services/User";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import {
  checkName,
  checkEmail,
  checkPassword,
} from "../../Validation/Validation";
import Notification from "../Notification/NotificationService";
import GIF from "../../assets/Gif/buttonloader.gif";

const Signup = ({ updateLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoader, setLoginLoader] = useState(false);
  const [conformPassword, setConformPassword] = useState("");

  const onClickHandler = () => {
    if (password !== conformPassword) {
      return Notification(
        "warning",
        "Signup",
        "Password and conform password does not match."
      );
    }
    if (
      checkName(username) === true &&
      checkEmail(email) === true &&
      checkPassword(password) === true
    ) {
      const payload = { username, email, password };
      User.SignupService(
        payload,
        () => {
          setLoginLoader(true);
        },
        (res) => {
          if (res) {
            Notification("success", "Signup", "User created successfully.");
            setLoginLoader(true);
            setLoginLoader(false);
            return updateLogin();
          }
        },
        (err) => {
          console.log(err);
          setLoginLoader(false);
          Notification("error", "Signup", "Issue in creating user");
        },
        () => {
          setEmail("");
          setPassword("");
          setConformPassword("");
          setUsername("");
        }
      );
    } else {
      Notification("error", "Signup", "Should Enter a valid data to signup.");
    }
  };

  return (
    <div className="signup-container">
      <h1 style={{ paddingTop: 10, paddingBottom: 30 }}>Sign Up</h1>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <div style={{ marginBottom: 15, padding: "0px 30px" }}>
          <Input
            placeholder="Enter Username"
            icon={<UserOutlined />}
            onBlurHandler={(username) => setUsername(username)}
            value={username}
            validation={checkName}
          />
        </div>
        <div style={{ marginBottom: 15, padding: "0px 30px" }}>
          <Input
            placeholder="Enter Email"
            icon={<GoogleOutlined />}
            onBlurHandler={(email) => setEmail(email)}
            value={email}
            validation={checkEmail}
          />
        </div>
        <div style={{ marginBottom: 15, padding: "0px 30px" }}>
          <Input
            placeholder="Enter Password"
            icon={<LockOutlined />}
            password={true}
            onBlurHandler={(password) => setPassword(password)}
            value={password}
            validation={checkPassword}
          />
        </div>
        <div style={{ marginBottom: 15, padding: "0px 30px" }}>
          <Input
            placeholder="Enter Conform Password"
            icon={<LockOutlined />}
            password={true}
            onBlurHandler={(password) => setConformPassword(password)}
            value={conformPassword}
            validation={checkPassword}
            clickToSubmit={onClickHandler}
          />
        </div>
        <Button type="submit" onClickHandler={onClickHandler}>
          Signup
          {loginLoader && <img src={GIF} height={25} width={25} />}
        </Button>
      </div>
      <div>
        <p>
          Alredy have a account <a onClick={updateLogin}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
