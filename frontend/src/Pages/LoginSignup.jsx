import React from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = React.useState("Login");
  const [formData, setFormData] = React.useState({ username: "", email: "", password: "" });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const login = async () => {
    console.log("   logging in...", formData);
    await fetch("http://localhost:4000/login", {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json())
      .catch((err) => console.error('Error:', err))
      .then((data) => {
        console.log('Success:', data.success);
        if (data.success) {
          console.log(data);
          localStorage.setItem('auth-token', data.token)
          window.location.replace("/");
        }
        else alert(data.error);
      });
  }
  const signup = async () => {
    console.log(" signing in...", formData);
    // send data to server for validation and account creation
    await fetch("http://localhost:4000/signup", {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json())

      .catch((err) => console.error('Error:', err))
      .then((data) => {
        console.log(data)
        if (data.success) {

          localStorage.setItem('auth-token', data.token)
          window.location.replace("/");
        }
        else alert(data.error);
      })
  }
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">

          {state === "SignUp" ? <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" /> : <></>}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />

        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "SignUp" ? <p className="loginsignup-login">
          Already have an account? <span style={{ cursor: "pointer" }} onClick={() => setState("Login")}>Login here</span></p> : <p className="loginsignup-login">
          Create an account? <span style={{ cursor: "pointer" }} onClick={() => setState("SignUp")}>SignUp here</span></p>}


        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing , I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
