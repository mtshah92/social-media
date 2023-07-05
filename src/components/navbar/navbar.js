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
          <div>
            <NavLink to="/home" className="nav-items home">
              <i class="bi bi-house"></i>
              &nbsp; Home
            </NavLink>
          </div>
          {/* <div>
            <NavLink to="/explore" className="nav-items explore">
              <i class="bi bi-rocket"></i>
              &nbsp; Explore
            </NavLink>
          </div> */}
          <div>
            <NavLink to="/bookmarks" className="nav-items bookmark">
              <i class="bi bi-bookmark"></i>
              &nbsp; Bookmark
            </NavLink>
          </div>
          <div>
            <NavLink to="/profile" className="nav-items profile">
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
