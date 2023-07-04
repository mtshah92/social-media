import { useContext } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PostContext } from "../../context/PostContext";

export const Bookmark = () => {
  const token = localStorage.getItem("encodedToken");
  const { state, getBookmarks, removeBookmark } = useContext(PostContext);

  useEffect(() => {
    getBookmarks(token);
  }, []);

  return (
    <div>
      <NavLink to="/home">Home</NavLink>
      {state.bookmarkPost.map((item) => {
        const { _id, username, content } = item;
        return (
          <div key={_id}>
            <h3>{username}</h3>
            <p>{content}</p>
            <button onClick={() => removeBookmark(_id, token)}>
              Remove Bookmark
            </button>
          </div>
        );
      })}
    </div>
  );
};
