import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostContext";

export const Navbar = () => {
  const { setPostModal } = useContext(PostContext);
  const { authData, foundUser } = useContext(AuthContext);
  // console.log(foundUser);
  return (
    <div className="navbar-area">
      <div className="navbar-content">
        <div className="nav-links">
          <div id="home">
            <NavLink to="/home" className="nav-items nav-home">
              <i class="bi bi-house"></i> &nbsp;Home
            </NavLink>
          </div>
          <div id="explore">
            <NavLink to="/explore-feed" className="nav-items nav-explore">
              <i class="bi bi-compass"></i>
              &nbsp; Explore
            </NavLink>
          </div>
          <div id="bookmark">
            <NavLink to="/bookmarks" className="nav-items nav-bookmark">
              <i class="bi bi-bookmark"></i>
              &nbsp; Bookmark
            </NavLink>
          </div>
          <div id="profile">
            <NavLink to="/profile" className="nav-items nav-profile">
              <i class="bi bi-person"></i>
              &nbsp; Profile
            </NavLink>
          </div>
          <div className="create-post">
            <button
              className="create-post-btn"
              onClick={() => setPostModal((toggle) => !toggle)}
            >
              Create New Post
            </button>
          </div>
        </div>
        <div className="user-details"></div>
        <div className="username-profile-link">
          <img src={foundUser?.profile_pic} className="profile-pic" />
          <div className="user-data">
            <NavLink to="/profile" className="user-data">
              <div className="name">
                {foundUser?.firstName + " " + foundUser?.lastName}
              </div>
              <div className="username">@{foundUser?.username}</div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
