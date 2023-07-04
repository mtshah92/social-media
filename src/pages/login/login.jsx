import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Login = () => {
  const { postLoginData, foundUser, errorCode, authData } =
    useContext(AuthContext);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  // console.log(errorCode);
  const navigate = useNavigate();
  return (
    <div className="login-page">
      <h1>MeBook</h1>
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <div className="credentials-container">
          <div>
            <label for="username" className="username-label">
              Username*
            </label>
          </div>
          <input
            id="username"
            placeholder="adarshbalika"
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                username: e.target.value,
              })
            }
          />

          <div className="password-label">
            <label for="password">Password*</label>
          </div>
          <input
            id="password"
            placeholder="adarshBalika123"
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                password: e.target.value,
              })
            }
          />
        </div>
        <div>
          <button
            className="login-btn"
            onClick={() => {
              postLoginData(
                loginCredentials.username,
                loginCredentials.password
              );
              console.log(authData.currentUser);
              // authData.currentUser && navigate("/home");
              foundUser && navigate("/home");
            }}
          >
            Log In
          </button>
        </div>

        <div>
          <button
            className="guest-mode-btn"
            onClick={() => {
              postLoginData("adarshbalika", "adarshBalika123");
            }}
          >
            Guest Mode
          </button>
        </div>
        <div>
          Don't Have a Account <NavLink to="/signup">Signup Here</NavLink>{" "}
        </div>
        {/* {errorCode && toast.error(errorCode)} */}
      </div>
    </div>
  );
};
