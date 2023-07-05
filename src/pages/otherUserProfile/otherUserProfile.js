import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostContext";
import { Navbar } from "../../components/navbar/navbar";
import { SideBar } from "../../components/sidebar/sidebar";
import { Header } from "../../components/header/header";
import { EditProfileModal } from "../../components/modals/editProfileModal/editProfile";

export const OtherUserProfile = () => {
  const { userId } = useParams();
  const { getUsers, authData, foundUser } = useContext(AuthContext);

  const {
    state,
    showEditProfileModal,
    setEditProfileModal,
    likePost,
    disLikePost,
    deletePost,
    bookmarkPost,
    removeBookmark,
    getBookmarks,
    showPostModal,
    showEditModal,
    setEditModal,
  } = useContext(PostContext);
  //   console.log(foundUser);
  const token = localStorage.getItem("encodedToken");

  const {
    firstName,
    lastName,
    username,
    profile_pic,
    protfolio_link,
    following,
    followers,
    bookmarks,
    bio,
  } = authData.otherUser;
  //   foundUser;
  //   console.log(authData.otherUser);
  // authData.currentUser.foundUser;

  const userPosts = state.allPosts.filter((data) => data.username === username);

  return (
    <div className="profile-page">
      <Header />
      <Navbar />
      <div className="profile-content">
        <div className="user-content">
          <img className="user-profile-image" src={profile_pic} />
          <h3 className="user-content-name">{firstName + " " + lastName}</h3>
          <p className="user-content-username">@{username}</p>

          <p className="bio"> {bio}</p>
          <a className="protfolio-link" href={protfolio_link} target="_blank">
            {protfolio_link}
          </a>
          <div className="follow-following-details">
            <div className="following-details">
              <p className="following-count">{following?.length}</p>
              <p className="following">Following</p>
            </div>
            <div className="posts-detail">
              <p className="posts-count">{userPosts?.length}</p>
              <p className="posts">Posts</p>
            </div>
            <div className="followers-detail">
              <p className="followers-count">{followers?.length}</p>
              <p className="followers">Followers</p>
            </div>
          </div>
        </div>
        <h3>Your Posts</h3>

        <div className="user-own-post">
          {userPosts.map((item) => {
            const { content, username, likes, content_img, _id } = item;
            const islikedbyMe = likes?.likedBy?.find(
              (item) => item.username === foundUser.username
              //   authData.otherUser.username
              //   foundUser.username
            );
            return (
              <div className="each-user-post">
                <img className="user-post-profile-image" src={profile_pic} />

                <div>
                  <div className="user-post-user-details">
                    <div className="user-post-user-data">
                      <p className="user-post-name">
                        {firstName + " " + lastName}
                      </p>
                      <p className="user-post-username">@{username}</p>
                    </div>
                  </div>
                  <p className="user-post-data">
                    {/* <div>
                      <img src={content_img} width="400" height="280" />
                    </div> */}
                    {content}
                  </p>
                  <div className="flex flex-row nowrap flex-space-between pb-xs pt-m pr-s flex-align-center">
                    <div>
                      {" "}
                      <div
                        onClick={() => {
                          if (islikedbyMe) {
                            disLikePost(_id, token);
                          } else {
                            likePost(_id, token);
                          }
                        }}
                      >
                        {islikedbyMe ? (
                          <i class="bi bi-suit-heart-fill red-clr like-btn"></i>
                        ) : (
                          <i class="bi bi-heart like-btn"></i>
                        )}{" "}
                        {likes?.likeCount}
                      </div>{" "}
                    </div>

                    <div>
                      {state.bookmarkPost.find((item) => item._id === _id) ? (
                        <i
                          className="bi bi-bookmark-fill bookmark-with-fill"
                          onClick={() => removeBookmark(_id, token)}
                        ></i>
                      ) : (
                        <i
                          class="bi bi-bookmark bookmark-btn"
                          onClick={() => bookmarkPost(_id, token)}
                        ></i>
                      )}
                    </div>

                    <i className="bi bi-share share-btn"></i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SideBar />
    </div>
  );
};
