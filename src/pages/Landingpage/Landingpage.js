import React, { useState } from "react";
import "./Landingpage.css";
import Signup from "../../components/Signup/Signup";
import Login from "../../components/Login/Login";
import Typing from "react-typing-animation";

const Landingpage = () => {
  const [existUser, setExistingUser] = useState(true);
  const [leftPannel, setLeftPannel] = useState(50);
  const [rightPannel, setRightPannel] = useState(50);

  const slowMotion = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        setLeftPannel((width) => width + 1);
        resolve();
      }, 2);
    });
  const onLogin = async () => {
    setRightPannel(0);
    while (leftPannel <= 102) {
      await slowMotion();
    }
  };
  return (
    <div className="landingpage-container">
      <div className="landingpage-name" style={{ width: `${leftPannel}%` }}>
        <Typing>
          <h1 className="landingpage-brand">Root Quotient</h1>
        </Typing>
      </div>
      <div
        className="landingpage-form-container"
        style={{ width: `${rightPannel}%` }}
      >
        {existUser ? (
          <Login
            updateSignup={() => setExistingUser(false)}
            onLogin={onLogin}
          />
        ) : (
          <Signup updateLogin={() => setExistingUser(true)} />
        )}
      </div>
    </div>
  );
};

export default Landingpage;
