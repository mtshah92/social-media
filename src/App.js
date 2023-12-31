import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/login";
import Mockman from "mockman-js";
import { Home } from "./pages/home/home";
import { RequireAuth } from "./components/RequireAuth/RequireAuth";
import { Signup } from "./pages/signup/signup";
import { LandingPage } from "./pages/landing/landing";
import { Bookmark } from "./pages/bookmark/bookmark";
import { Profile } from "./pages/profile/profile";
import { OtherUserProfile } from "./pages/otherUserProfile/otherUserProfile";
import { ExploreFeed } from "./pages/exploreFeed/exploreFeed";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      {/* <Toaster
        position="bottom-left"
        reverseOrder={false}
        containerStyle={{
          bottom: "4rem",
          right: "1rem",
          fontSize: "0.9rem",
        }}
      /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user/:userId"
          element={
            <RequireAuth>
              <OtherUserProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="mockman" element={<Mockman />} />
        <Route
          path="/bookmarks"
          element={
            <RequireAuth>
              <Bookmark />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route
          path="/explore-feed"
          element={
            <RequireAuth>
              <ExploreFeed />
            </RequireAuth>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
