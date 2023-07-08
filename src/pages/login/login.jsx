import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

export const Login = () => {
  const { postLoginData } = useContext(AuthContext);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  console.log(showPassword);
  // console.log(errorCode);

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
            value={loginCredentials.username}
          />

          <div className="password-label">
            <label for="password">Password*</label>
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="adarshBalika123"
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                password: e.target.value,
              })
            }
            value={loginCredentials.password}
          />
          {!showPassword ? (
            <i
              class="bi bi-eye-slash-fill toggle-password"
              onClick={() => setShowPassword(true)}
            ></i>
          ) : (
            <i
              class="bi bi-eye-fill toggle-password"
              onClick={() => setShowPassword(false)}
            ></i>
          )}
        </div>
        <div>
          <button
            className="login-btn"
            onClick={() => {
              postLoginData(
                loginCredentials.username,
                loginCredentials.password
              );

              // console.log(authData.currentUser);
              // authData.currentUser && navigate("/home");
            }}
          >
            Log In
          </button>
        </div>

        <div>
          <button
            className="guest-mode-btn"
            onClick={() => {
              setLoginCredentials({
                username: "adarshbalika",
                password: "adarshBalika123",
              });
              postLoginData("adarshbalika", "adarshBalika123");
            }}
          >
            Guest Mode
          </button>
        </div>
        {/* <div>
          Don't Have a Account <NavLink to="/signup">Signup Here</NavLink>{" "}
        </div> */}
        {/* {errorCode && toast.error(errorCode)} */}
      </div>
    </div>
  );
};
