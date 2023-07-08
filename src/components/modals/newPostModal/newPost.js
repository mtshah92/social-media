import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { PostContext } from "../../../context/PostContext";
import { useState } from "react";
import "./newPost.css";

export const NewPostModal = () => {
  const { authData, foundUser } = useContext(AuthContext);
  const { createPost, setPostModal } = useContext(PostContext);

  const [newPost, setNewPost] = useState();

  const token = localStorage.getItem("encodedToken");

  return (
    <div className="newPost-modal">
      <div>
        <img
          src={foundUser.profile_pic}
          height="50"
          width="50"
          className="user-profile-pic"
        />
      </div>
      <div className="createPost-context">
        <textarea
          className="createPost-textarea"
          placeholder="What's happening..."
          onChange={(e) => setNewPost(e.target.value)}
        />

        <div className="createPost-btn">
          <button
            onClick={() => {
              createPost(newPost, token);
              setPostModal(false);
            }}
            className="post-btn"
          >
            Post
          </button>
          <button className="cancel-btn" onClick={() => setPostModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
