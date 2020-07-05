import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import User from "../../services/User";
import { AuthContext } from "../../Context/AuthContext";
import { SET_IS_AUTHENTICATED, SET_USER_DETAILS } from "../../types/auth";
import { LockFilled, GoogleOutlined } from "@ant-design/icons";
import { checkEmail, checkPassword } from "../../Validation/Validation";
import Notification from "../Notification/NotificationService";
import GIF from "../../assets/Gif/buttonloader.gif";

const Login = (props) => {
  const { updateSignup } = props;
  const [email, setEmail] = useState("anto@gmail.com");
  const [password, setPassword] = useState("abcd@1234");
  const [loginLoader, setLoginLoader] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const onClickHandler = () => {
    if (checkEmail(email) === true && checkPassword(password) === true) {
      const payload = { email, password };
      User.SigninService(
        payload,
        () => {
          setLoginLoader(true);
        },
        (res) => {
          if (res.data.success && res.data.token) {
            localStorage.setItem("TOKEN", res.data.token);
            dispatch({ type: SET_IS_AUTHENTICATED, payload: true });
            dispatch({ type: SET_USER_DETAILS, payload: res.data.user });
            Notification("success", "Login", "Login successful.");
            setLoginLoader(false);
            return props.history.push("/dashboard/home");
          }
        },
        (err) => {
          console.log(err);
          Notification("error", "Login", "Login failed.");
          setLoginLoader(false);
        }, () => {
          setEmail("");
          setPassword("");
        }
      );
    } else {
      Notification("error", "Login", "Should Enter a valid data to signin.");
    }
  };

  return (
    <div className="signup-container">
      <h1 style={{ paddingTop: 10, paddingBottom: 30 }}>Login</h1>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <div style={{ marginBottom: 15, padding: "0px 30px" }}>
          <Input
            placeholder="Enter Email"
            icon={<GoogleOutlined />}
            onBlurHandler={(email) => setEmail(email)}
            value={email}
            validation={checkEmail}
            clickToSubmit={onClickHandler}
          />
        </div>
        <div style={{ marginBottom: 15, padding: "0px 30px" }}>
          <Input
            placeholder="Enter Password"
            icon={<LockFilled />}
            password={true}
            onBlurHandler={(password) => setPassword(password)}
            value={password}
            validation={checkPassword}
            clickToSubmit={onClickHandler}
          />
        </div>
        <Button onClickHandler={onClickHandler}>
          {" "}
          Login
          {loginLoader && <img src={GIF} alt="Loading. . . " height={25} width={25} />}
        </Button>
      </div>
      <div>
        <p>
          don't have an account <a onClick={updateSignup}>signup</a>
        </p>
      </div>
    </div>
  );
};

export default withRouter(Login);
