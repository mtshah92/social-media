import "./header.css";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { setFoundUser, foundUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="logo">
        <h1>Me Book</h1>
      </div>
      <i
        class="bi bi-box-arrow-right"
        onClick={() => {
          setFoundUser(null);
          localStorage.removeItem("encodedToken");
          localStorage.removeItem("user");

          !foundUser && navigate("/login");
        }}
      ></i>
    </div>
  );
};
