import axios from "axios";
import { useDebugValue, useReducer, useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const initialState = {
    allPosts: [],
    bookmarkPost: [],
  };

  const [showPostModal, setPostModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [showEditProfileModal, setEditProfileModal] = useState(false);
  const eventHandler = (state, action) => {
    switch (action.type) {
      case "getPost": {
        return {
          ...state,
          allPosts: action.payload,
        };
      }
      case "likePost": {
        return {
          ...state,
          allPosts: action.payload,
        };
      }

      case "disLikePost": {
        return {
          ...state,
          allPosts: action.payload,
        };
      }

      case "deletePost": {
        return {
          ...state,
          allPosts: action.payload,
        };
      }
      case "sortByTrending": {
        return {
          ...state,
          allPosts: state.allPosts.sort(
            (a, b) => b.likes.likeCount - a.likes.likeCount
          ),
        };
      }

      case "sortByLatest": {
        return {
          ...state,
          allPosts: state.allPosts.sort((a, b) =>
            new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
          ),
        };
      }

      case "sortByOldest": {
        return {
          ...state,
          allPosts: state.allPosts.sort((a, b) =>
            new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
          ),
        };
      }

      case "createPost": {
        return {
          ...state,
          allPosts: action.payload,
        };
      }
      case "getBookmarks": {
        return {
          ...state,
          bookmarkPost: action.payload,
        };
      }

      case "removeBookmark": {
        return {
          ...state,
          bookmarkPost: action.payload,
        };
      }

      default:
        return state;
    }
  };

  const posts = async () => {
    try {
      const response = await axios.get("/api/posts");
      dispatch({ type: "getPost", payload: response.data.posts });
    } catch (e) {
      console.error(e);
    }
  };

  const createPost = async (data, authorization) => {
    const postData = { content: data };
    try {
      const response = await axios.post(
        "/api/posts",
        { postData },
        { headers: { authorization } }
      );
      dispatch({ type: "createPost", payload: response.data.posts });
    } catch (e) {
      console.error(e);
    }
  };

  const editPost = async (postcontent, id, authorization) => {
    // console.log(data, id, authorization);
    const postData = { content: postcontent };
    try {
      const response = await axios.post(
        `/api/posts/edit/${id}`,
        { postData },
        { headers: { authorization: authorization } }
      );
      // console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };
  const likePost = async (id, authorization) => {
    try {
      const response = await axios.post(
        `/api/posts/like/${id}`,
        {},
        { headers: { authorization } }
      );
      dispatch({ type: "likePost", payload: response.data.posts });
    } catch (e) {
      console.error(e);
    }
  };

  const disLikePost = async (id, authorization) => {
    try {
      const response = await axios.post(
        `/api/posts/dislike/${id}`,
        {},
        { headers: { authorization } }
      );
      dispatch({ type: "disLikePost", payload: response.data.posts });
    } catch (e) {
      console.error(e);
    }
  };

  const deletePost = async (id, authorization) => {
    console.log(id, authorization);
    try {
      const response = await axios.delete(`/api/posts/${id}`, {
        headers: { authorization: authorization },
      });
      dispatch({ type: "deletePost", payload: response.data.posts });
    } catch (e) {
      console.error(e);
    }
  };

  const bookmarkPost = async (id, authorization) => {
    try {
      const response = await axios.post(
        `/api/users/bookmark/${id}`,
        {},
        {
          headers: { authorization: authorization },
        }
      );
      dispatch({ type: "getBookmarks", payload: response.data.bookmarks });
    } catch (e) {
      console.error(e);
    }
  };

  const removeBookmark = async (id, authorization) => {
    try {
      const response = await axios.post(
        `/api/users/remove-bookmark/${id}`,
        {},
        { headers: { authorization: authorization } }
      );
      dispatch({ type: "removeBookmark", payload: response.data.bookmarks });
    } catch (e) {
      console.error(e);
    }
  };

  const getBookmarks = async (authorization) => {
    try {
      const response = await axios.get("/api/users/bookmark", {
        headers: { authorization: authorization },
      });
      dispatch({ type: "getBookmarks", payload: response.data.bookmarks });
    } catch (e) {
      console.error(e);
    }
  };

  const [state, dispatch] = useReducer(eventHandler, initialState);
  useEffect(() => posts, []);
  // console.log(state.bookmarkPost);
  return (
    <PostContext.Provider
      value={{
        createPost,
        editPost,
        likePost,
        disLikePost,
        deletePost,
        bookmarkPost,
        state,
        dispatch,
        removeBookmark,
        bookmarkPost,
        getBookmarks,
        setPostModal,
        showPostModal,
        showEditModal,
        setEditModal,
        showEditProfileModal,
        setEditProfileModal,
        posts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
