import { NavLink } from "react-router-dom";
import "./sidebar.css";
import { useContext, useState } from "react";
import { PostContext } from "../../context/PostContext";
import { AuthContext } from "../../context/AuthContext";
export const SideBar = () => {
  const { authData, foundUser, followUser, unfollowUser, getEachUser } =
    useContext(AuthContext);

  const [searchUser, setSearchUser] = useState();
  console.log(foundUser);
  const usersToFollow = authData?.allUsers?.filter(
    (item) => item._id !== foundUser?._id
  );

  const userList = usersToFollow.filter(
    (item) => !foundUser.following.find((val) => item._id === val._id)
  );

  console.log(userList);
  // const userList = usersToFollow.filter(
  //   (user) =>
  //     !foundUser?.following?.find((item) => item.username === user.username)
  // );

  // console.log(userList);
  const token = localStorage.getItem("encodedToken");

  const getfilteredUser = (user) => {
    let data = [...userList];

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
              following,
            } = item;

            return (
              <div className="each-user">
                <img className="users-profile-pic" src={profile_pic} />
                <div className="users-details">
                  <NavLink
                    className="nav-link"
                    to={`/user/${_id}`}
                    onClick={() => getEachUser(_id)}
                  >
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
