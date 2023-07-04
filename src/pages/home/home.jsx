import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { PostContext } from "../../context/PostContext";
import { Header } from "../../components/header/header";
import { Navbar } from "../../components/navbar/navbar";
import { SideBar } from "../../components/sidebar/sidebar";
// import { bookmarkPost, removeBookmark } from "./bookmark";
// import { Bookmark } from "./bookmark";
import "./home.css";
import { NewPostModal } from "../../components/modals/newPostModal/newPost";
import { EditPostModal } from "../../components/modals/editPostModal/editPost";

export const Home = () => {
  const { foundUser, setFoundUser, authData } = useContext(AuthContext);
  const {
    createPost,
    likePost,
    state,
    dispatch,
    disLikePost,
    deletePost,
    bookmarkPost,
    removeBookmark,
    getBookmarks,
    showPostModal,
    showEditModal,
    setEditModal,
  } = useContext(PostContext);

  const [newPost, setNewPost] = useState("");
  const token = localStorage.getItem("encodedToken");
  const [showFilter, setShowFilter] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentFilter, setFilter] = useState();
  // const currentUserData = JSON.parse(localStorage.getItem("user"));
  // console.log(currentUserData.firstName);

  const getfilteredData = (filter) => {
    let data = [...state.allPosts];
    if (filter === "trending") {
      return data.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
    }
    if (filter === "latestPost") {
      return data.sort((a, b) =>
        new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
      );
    }
    if (filter === "olderPost") {
      return data.sort((a, b) =>
        new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
      );
    } else return data;
  };

  const filterData = getfilteredData(currentFilter);
  console.log(filterData);

  return (
    <div className="home">
      <Header />
      <Navbar />
      {showPostModal && <NewPostModal />}

      <div className="home-content mt-xl">
        <div className="createPost white-bg mr-xxl p-xs mt-s">
          <div className="flex flex-row nowrap p-xs">
            <div class="w-full">
              <textarea
                className="w-full lynx-white-bg p-s outline-transparent border-none"
                placeholder="Write something interesting..."
                onChange={(e) => setNewPost(e.target.value)}
              />
              <div className="flex flex-space-between pt-s">
                <div className="flex flex-gap">
                  <button
                    className="post-btn primary-bg p-l pt-xs pb-xs secondary-color border-none outline-transparent"
                    onClick={() => createPost(newPost, token)}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="filter flex flex-space-between mr-xxl flex-align-center pt-s">
          <h3>Latest Posts</h3>
          <div className="dropdown">
            <button
              className="drop-btn"
              onClick={() => setShowFilter((showFilter) => !showFilter)}
            >
              Filters
            </button>
            <div
              id={showFilter && "dropdown-menu"}
              className="dropdown-content"
            >
              <div
                className="dropdown-items"
                style={{
                  color: currentFilter === "trending" ? "blue" : "black",
                }}
                onClick={() => {
                  setFilter("trending");
                  setShowFilter((showFilter) => !showFilter);
                }}
              >
                Trending
              </div>
              <div
                className="dropdown-items"
                style={{
                  color: currentFilter === "latestPost" ? "blue" : "black",
                }}
                onClick={() => {
                  setFilter("latestPost");
                  setShowFilter((showFilter) => !showFilter);
                }}
              >
                Latest Posts
              </div>
              <div
                className="dropdown-items"
                style={{
                  color: currentFilter === "olderPost" ? "blue" : "black",
                }}
                onClick={() => {
                  setFilter("olderPost");
                  setShowFilter((showFilter) => !showFilter);
                }}
              >
                Older Posts
              </div>
            </div>
          </div>
        </div>
        <div className="white-bg mr-xxl p-xs mt-s">
          <div className="flex flex-row nowrap p-xs">
            <ul>
              {filterData.map((item) => {
                const { content, id, likes, username, _id, content_img } = item;
                const currentUser = foundUser?.username;

                const islikedbyMe = likes?.likedBy?.find(
                  (item) => item.username === foundUser.username
                );

                const allusersData = authData?.allUsers;
                const userData = allusersData.filter(
                  (data) => data.username === username
                )[0];

                return (
                  <div className="white-bg mr-xxl p-xs mt-s">
                    <div className="flex flex-row nowrap p-xs" key={id}>
                      <img
                        src={userData.profile_pic}
                        className="br-full width-xl height-xl p-xs mr-xs"
                      />
                      <div>
                        <div className="flex flex-row flex-align-center flex-space-between">
                          <div className="flex flex-row">
                            <p className="fw-semibold">
                              {userData.firstName + " " + userData.lastName}
                            </p>
                            <p className="grey-color pl-xs"> @{username}</p>
                          </div>
                          {currentUser === username && (
                            <div>
                              {" "}
                              {showEditModal && (
                                <EditPostModal
                                  img={content_img}
                                  content={content}
                                  profile_pic={userData.profile_pic}
                                  postId={_id}
                                  authorization={token}
                                />
                              )}
                            </div>
                          )}

                          {currentUser === username && (
                            <div className="dropdown">
                              <div
                                className="drop-btn"
                                onClick={() =>
                                  setShowEdit((showEdit) => !showEdit)
                                }
                              >
                                edit
                              </div>
                              <div
                                id={showEdit && "dropdown-menu"}
                                className="dropdown-content"
                              >
                                <div
                                  className="dropdown-items"
                                  onClick={() => {
                                    deletePost(_id, token);
                                    setShowEdit((showEdit) => !showEdit);
                                  }}
                                >
                                  Delete
                                </div>
                                <div onClick={() => setEditModal(true)}>
                                  Edit
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {content_img && (
                          <img
                            src={content_img}
                            alt="content"
                            width="400"
                            height="300"
                          />
                        )}
                        <p className="pr-s pt-xs">{content}</p>

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
                                <i class="bi bi-suit-heart-fill red-clr"></i>
                              ) : (
                                <i class="bi bi-heart"></i>
                              )}{" "}
                              {likes?.likeCount}
                            </div>{" "}
                          </div>

                          <div>
                            {state.bookmarkPost.find(
                              (item) => item._id === _id
                            ) ? (
                              <i
                                class="bi bi-bookmark-fill"
                                onClick={() => removeBookmark(_id, token)}
                              ></i>
                            ) : (
                              <i
                                class="bi bi-bookmark"
                                onClick={() => bookmarkPost(_id, token)}
                              ></i>
                            )}
                          </div>

                          <i class="bi bi-share"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <SideBar />
    </div>
  );
};
