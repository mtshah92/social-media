import { useContext, useState } from "react";
import { PostContext } from "../../../context/PostContext";
import "./editPost.css";

export const EditPostModal = ({
  img,
  content,
  profile_pic,
  postId,
  authorization,
}) => {
  const [editPostData, setEditPostData] = useState();
  const { showEditModal, setEditModal, editPost, posts } =
    useContext(PostContext);
  // console.log(img);
  return (
    <div className="edit-post-wrapper">
      <div>
        <img
          src={profile_pic}
          height="50"
          width="50"
          className="user-profile-pic"
        />
      </div>
      <div className="editPost-context">
        <textarea
          className="editPost-textarea"
          onChange={(e) => setEditPostData(e.target.value)}
        >
          {content}
          {/* <img
            src={img}
            className="user-content-image"
            hieght="150"
            width="150"
          /> */}
        </textarea>

        <div className="edit-btn">
          <button
            onClick={() => {
              editPost(editPostData, postId, authorization);
              posts();
              setEditModal(false);
              //   createPost(newPost, token);
              //   setPostModal(false);
            }}
            className="save-btn"
          >
            Post
          </button>
          <button
            className="close-btn"
            onClick={
              () => setEditModal(false)
              //  setPostModal(false)
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
