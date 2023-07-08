import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./signup.css";
import { NavLink } from "react-router-dom";

export const Signup = () => {
  const { signupData } = useContext(AuthContext);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    bio: "",
    protfolio_link: "",
  });
  const [confirmPassword, setConfirmPassword] = useState();

  return (
    <div className="signup-page">
      <h1 className="signup-title">Sign-Up</h1>
      <div className="signup-card">
        <div className="signup-items">
          <label for="email-signup">Email:</label>
          <div>
            <input id="email-signup" placeholder="email" />
          </div>
        </div>
        <div className="signup-items">
          <label for="first-name">
            First Name:{" "}
            <div>
              <input
                id="first-name"
                placeholder="First Name"
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
              />
            </div>
          </label>
        </div>
        <div className="signup-items">
          <label for="last-name">
            Last Name:{" "}
            <div>
              <input
                id="last-name"
                placeholder="Last Name"
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
              />
            </div>
          </label>
        </div>
        <div className="signup-items">
          <label for="username">
            Username:{" "}
            <div>
              <input
                id="username"
                placeholder="Username"
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
            </div>
          </label>
        </div>
        <div className="signup-items">
          <label for="password">
            Password:{" "}
            <div>
              <input
                id="password"
                placeholder="password"
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>
          </label>
        </div>
        <div className="signup-items">
          <label for="confirm-password">
            Confirm Password:{" "}
            <div>
              <input
                id="confirm-password"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </label>
        </div>
        <div className="signup-items">
          <button
            className="signup-submit"
            onClick={() => {
              signupData(newUser);
            }}
            disabled={newUser.password !== confirmPassword}
          >
            submit
          </button>
        </div>
        Already have an account? <NavLink to="/login">Login Here</NavLink>
      </div>
    </div>
  );
};
