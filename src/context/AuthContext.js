import axios from "axios";
import { useEffect } from "react";
import { createContext, useReducer, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [foundUser, setFoundUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const navigate = useNavigate();

  // const [errorCode, setErrorCode] = useState();
  const initialState = {
    allUsers: [],
    currentUser: [],
    otherUser: [],
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
      case "eachUser": {
        return {
          ...authData,
          otherUser: action.payload,
        };
      }

      case "following": {
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
      navigate("/home");

      toast.success("Login successful");
      // console.log(response?.data?.foundUser);
    } catch (e) {
      // setErrorCode(...e.response?.data?.errors);
      toast.error(...e.response?.data?.errors);
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
      navigate("/home");
      toast.success("Sign-in Successful");
    } catch (e) {
      console.error(e);
    }
  };

  const getEachUser = async (id) => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      dispatch({ type: "eachUser", payload: response.data.user });
      // console.log(response.data.user);
    } catch (e) {
      toast.error(e);
      console.error(e);
    }
  };
  const logOut = () => {
    setFoundUser(null);
    localStorage.removeItem("encodedToken");
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logged Out");
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

  const editUser = async (encodedToken, img, updatedBio, updatedProtfolio) => {
    console.log(encodedToken, img, updatedBio, updatedProtfolio);
    try {
      const response = await axios.post(
        "/api/users/edit",
        {
          userData: {
            profile_pic: img,
            bio: updatedBio,
            protfolio_link: updatedProtfolio,
          },
        },
        { headers: { authorization: encodedToken } }
      );
      setFoundUser(response.data.user);
      toast.success("Edited User Details Successfully");
      // dispatch({ type: "editUserData", payload: response.data.user });
      // console.log(response.data);
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
      dispatch({ type: "following", payload: response.data.user });
      setFoundUser(response.data.user);
      toast.success("Followed User");
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
      setFoundUser(response.data.user);
      toast.success("Unfollowed User");
      // console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const [authData, dispatch] = useReducer(authDatahaandler, initialState);

  useEffect(() => {
    getUsers();
  }, []);
  // console.log(authData.allUsers);

  return (
    <AuthContext.Provider
      value={{
        postLoginData,
        foundUser,
        getEachUser,
        setFoundUser,
        editUser,

        signupData,
        getUsers,
        authData,
        followUser,
        unfollowUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
