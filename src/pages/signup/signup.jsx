import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const { signupData, foundUser } = useContext(AuthContext);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();
  // console.log(foundUser);
  // const token = localStorage.getItem("encodedToken");
  // const encodedToken = localStorage.getItem("encodedToken");
  // console.log(localStorage.getItem("encodedToken"));
  // console.log(encodedToken);
  return (
    <div className="signup">
      <h1>Sign-Up</h1>
      <div>
        <label for="email-signup">
          Email: <input id="email-signup" placeholder="email" />
        </label>
      </div>

      <div>
        <label for="first-name">
          First Name:{" "}
          <input
            id="first-name"
            placeholder="First Name"
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
          />
        </label>
      </div>

      <div>
        <label for="last-name">
          Last Name:{" "}
          <input
            id="last-name"
            placeholder="Last Name"
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
          />
        </label>
      </div>

      <div>
        <label for="username">
          Username:{" "}
          <input
            id="username"
            placeholder="Username"
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
        </label>
      </div>

      <div>
        <label for="password">
          Password:{" "}
          <input
            id="password"
            placeholder="password"
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
        </label>
      </div>

      <div>
        <label for="confirm-password">
          Confirm Password:{" "}
          <input
            id="confirm-password"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
      </div>

      <div>
        <button
          onClick={() => {
            signupData(newUser);
            // encodedToken && navigate("/home");
          }}
          disabled={newUser.password !== confirmPassword}
        >
          submit
          {/* {token ? navigate("/home") : <p>Submit</p>} */}
        </button>
      </div>
    </div>
  );
};
