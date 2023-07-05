import { NavLink, useNavigate } from "react-router-dom";
import "./landing.css";
import mebookpng from "../../images/mebook-logo.png";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      <div className="mebook-landing-content">
        <div className="meebook">
          <h1>Me Book</h1>
          <div className="about-mebook">
            <p className="about-1">
              <span className="highlight-text">Follow</span> people around the
              globe
            </p>
            <p className="about-2">
              <span className="highlight-text">Connect</span> with Your Friends
            </p>
            <p className="about-3">
              <span className="highlight-text">Share</span> with your Thinking
            </p>
          </div>
          <div>
            <button className="join-button" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
          {/* <div className="already-account-container">
            <NavLink to="/login" className="already-account-link">
              Already have an account?
            </NavLink>
          </div> */}
        </div>
      </div>

      <div className="mebook-landing-image">
        <img src={mebookpng} width="500" height="400" alt="mebook" />
      </div>
    </div>
  );
};
