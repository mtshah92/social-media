import { useContext } from "react";
import { PostContext } from "../../context/PostContext";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { NewPostModal } from "../../components/modals/newPostModal/newPost";
import { Header } from "../../components/header/header";
import { Navbar } from "../../components/navbar/navbar";
import { SideBar } from "../../components/sidebar/sidebar";
import { EditPostModal } from "../../components/modals/editPostModal/editPost";

export const ExploreFeed = () => {
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
  const [showEdit, setShowEdit] = useState(false);

  const token = localStorage.getItem("encodedToken");

  return (
    <>
      <div className="home">
        <Header />
        <Navbar />
        {showPostModal && <NewPostModal />}

        <div className="home-content mt-xl">
          <h2>Explore Feeds</h2>

          <div className="mr-xxl p-xs mt-s">
            <div className="flex flex-row nowrap p-xs">
              <ul>
                {state.allPosts.map((item) => {
                  const { content, id, likes, username, _id, content_img } =
                    item;
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
          </div>
        </div>
        <SideBar />
      </div>
    </>
  );
};
