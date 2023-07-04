import axios from "axios";
import { useEffect } from "react";
import { createContext, useReducer, useState } from "react";
import { act } from "react-dom/test-utils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [foundUser, setFoundUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  // JSON.parse(localStorage.getItem("user"))

  const [errorCode, setErrorCode] = useState();
  const initialState = {
    allUsers: [],
    currentUser: [],
  };
  const authDatahaandler = (authData, action) => {
    switch (action.type) {
      case "postLogin": {
        return {
          ...authData,
          currentUser: action.payload,
        };
      }
      case "signup": {
        return {
          ...authData,
          currentUser: action.payload,
        };
      }
      case "getUsers": {
        return {
          ...authData,
          allUsers: action.payload,
        };
      }
      case "editUserData": {
        return {
          ...authData,
          currentUser: action.payload,
        };
      }
      default:
        return authData;
    }
  };
  const postLoginData = async (username, password) => {
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("encodedToken", response?.data?.encodedToken);
      localStorage.setItem("user", JSON.stringify(response?.data?.foundUser));
      setFoundUser(response?.data?.foundUser);
      dispatch({ type: "postLogin", payload: response.data });
      // console.log(response);
    } catch (e) {
      setErrorCode(...e.response?.data?.errors);
    }
  };

  const signupData = async (data) => {
    try {
      const response = await axios.post("/api/auth/signup", { postData: data });
      console.log(response);
      localStorage.setItem("encodedToken", response?.data?.encodedToken);
      localStorage.setItem("user", JSON.stringify(response?.data?.foundUser));
      setFoundUser(response?.data?.foundUser);
      dispatch({
        type: "signup",
        payload: response.data.createdUser,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const getUsers = async () => {
    try {
      const response = await axios.get("/api/users/");
      // console.log(response.data.users);
      dispatch({ type: "getUsers", payload: response.data.users });
    } catch (e) {
      console.error(e);
    }
  };

  const editUser = async (encodedToken, img, updatedBio) => {
    // console.log(encodedToken, img);
    try {
      const response = await axios.post(
        "/api/users/edit",
        { userData: { profile_pic: img, bio: updatedBio } },
        { headers: { authorization: encodedToken } }
      );
      setFoundUser(response.data.user);
      // dispatch({ type: "editUserData", payload: response.data.user });
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const followUser = async (id, token) => {
    try {
      const response = await axios.post(
        `/api/users/follow/${id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      getUsers();
      // console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const unfollowUser = async (id, token) => {
    try {
      const response = await axios.post(
        `/api/users/unfollow/${id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      getUsers();
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const [authData, dispatch] = useReducer(authDatahaandler, initialState);

  useEffect(() => getUsers, []);
  console.log(authData.currentUser);

  return (
    <AuthContext.Provider
      value={{
        postLoginData,
        foundUser,
        setFoundUser,
        editUser,
        errorCode,
        signupData,
        getUsers,
        authData,
        followUser,
        unfollowUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
