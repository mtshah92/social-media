import { NavLink } from "react-router-dom";
import "./sidebar.css";
import { useContext, useState } from "react";
import { PostContext } from "../../context/PostContext";
import { AuthContext } from "../../context/AuthContext";
export const SideBar = () => {
  const { authData, foundUser, followUser, unfollowUser } =
    useContext(AuthContext);

  const [searchUser, setSearchUser] = useState();
  // console.log(foundUser);
  const usersToFollow = authData?.allUsers?.filter(
    (item) => item.username !== foundUser?.username
  );

  const token = localStorage.getItem("encodedToken");

  const getfilteredUser = (user) => {
    let data = [...usersToFollow];

    if (user) {
      return data.filter((item) =>
        item.username.toLowerCase().includes(user.toLowerCase())
      );
    } else return data;
  };

  const filteredUser = getfilteredUser(searchUser);

  return (
    <div className="sidebar">
      <div className="search-bar">
        <i class="bi bi-search"></i>
        <input
          placeholder="search by username"
          name="searchbar"
          className="input-search"
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </div>

      <div className="to-follow-list">
        <div className="who-follow"> Who to Follow</div>

        <div>
          {filteredUser.map((item) => {
            const {
              firstName,
              lastName,
              username,
              profile_pic,
              _id,
              followers,
            } = item;

            return (
              <div className="each-user">
                <img className="users-profile-pic" src={profile_pic} />
                <div className="users-details">
                  <NavLink className="nav-link">
                    <div className="users-name">
                      {firstName + "  " + lastName}
                    </div>
                    <div className="users-username">@{username}</div>
                  </NavLink>
                </div>
                <div className="follow-link">
                  <div className="nav-link">
                    {followers.find((data) => data._id === foundUser?._id) ? (
                      <button onClick={() => unfollowUser(_id, token)}>
                        Followed
                        {/* Follow{" "}
                        <i
                          class="bi bi-plus-lg"
                          onClick={() => followUser(_id, token)}
                        ></i> */}
                      </button>
                    ) : (
                      <button onClick={() => followUser(_id, token)}>
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
