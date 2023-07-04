import { useState } from "react";
import { avtars } from "../../../backend/db/avtars";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { PostContext } from "../../../context/PostContext";
import "./editProfile.css";

export const EditProfileModal = ({ profileImage, auth, bio }) => {
  const { editUser, getUsers } = useContext(AuthContext);
  const { setEditProfileModal } = useContext(PostContext);

  const [updateAvtar, setUpdateAvtar] = useState(profileImage);
  const [editBio, setEditBio] = useState(bio);

  return (
    <div className="edit-profile-wrappper">
      <h3>Edit User Profile</h3>
      <div>
        <h3>Bio</h3>
        <input
          placeholder="Enter Bio"
          onChange={(e) => setEditBio(e.target.value)}
        />
        {bio}
      </div>
      <img src={updateAvtar} className="edit-profile-img" />
      <h3 className="user-profile-text">User Profile Image</h3>

      <p className="select-image-text">
        Select Profile Image from Below Avtars
      </p>
      <div className="avtar-container">
        {avtars.map(({ id, url }) => (
          <div key={id} className="each-avtar">
            <img
              src={url}
              onClick={() => setUpdateAvtar(url)}
              className="edit-avtar-img"
            />
          </div>
        ))}
      </div>

      <div className="edit-avtar-btn">
        <button
          onClick={() => {
            editUser(auth, updateAvtar, bio);
            getUsers();
            setEditProfileModal(false);
          }}
          className="update-avtar-btn"
        >
          Update
        </button>
        <button
          onClick={() => setEditProfileModal(false)}
          className="cancel-avtar-btn"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
