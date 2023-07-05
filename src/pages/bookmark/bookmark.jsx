import { useContext } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PostContext } from "../../context/PostContext";
import { Header } from "../../components/header/header";
import { Navbar } from "../../components/navbar/navbar";
import { SideBar } from "../../components/sidebar/sidebar";
import { AuthContext } from "../../context/AuthContext";
import "./bookmark.css";
import { EditPostModal } from "../../components/modals/editPostModal/editPost";
import { useState } from "react";

export const Bookmark = () => {
  const token = localStorage.getItem("encodedToken");
  const {
    state,
    getBookmarks,
    removeBookmark,
    likePost,
    disLikePost,
    deletePost,
    bookmarkPost,
    showEditModal,
    setEditModal,
  } = useContext(PostContext);
  const { foundUser, authData } = useContext(AuthContext);

  const [showEdit, setShowEdit] = useState(false);
  console.log(state.bookmarkPost);

  useEffect(() => {
    getBookmarks(token);
  }, []);

  return (
    <div className="bookmark-page">
      <Header />
      <Navbar />
      <div className="bookmark-main-content">
        <div className="no-bookmark">
          {" "}
          {state.bookmarkPost.length === 0 && (
            <h2>You haven't Bookmark any Post yet.</h2>
          )}
        </div>

        <div className="bookmark-list">
          {" "}
          <div className="">
            <ul>
              {state.bookmarkPost.map((item) => {
                const { content, id, likes, username, _id, content_img } = item;

                console.log(content_img);
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
                                <i class="bi bi-three-dots"></i>
                              </div>
                              <div
                                id={showEdit && "dropdown-menu"}
                                className="dropdown-content"
                              >
                                <div
                                  className="dropdown-items"
                                  onClick={() => {
                                    deletePost(_id, token);
                                    setShowEdit(false);
                                  }}
                                >
                                  Delete
                                </div>
                                <div
                                  className="dropdown-items"
                                  onClick={() => {
                                    setEditModal(true);
                                    setShowEdit(false);
                                  }}
                                >
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
                        <p className="bookmark-post-content">{content}</p>

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
                            {state.bookmarkPost.find(
                              (item) => item._id === _id
                            ) ? (
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
                  </div>
                );
              })}
            </ul>
          </div>
          {/* {state.bookmarkPost.map((item) => {
            const { _id, username, content, likes } = item;
            // return (
            //   <div className="white-bg mr-xxl p-xs mt-s">
            //     <div className="flex flex-row nowrap p-xs" key={_id}>
            //       <h3>{username}</h3>
            //       <p>{content}</p>
            //       <button onClick={() => removeBookmark(_id, token)}>
            //         Remove Bookmark
            //       </button>
            //     </div>
            //   </div>
            // );
          })} */}
        </div>
      </div>
      <SideBar />
    </div>
  );
};
