import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "1",
    firstName: "Meet",
    lastName: "Shah",
    username: "mshah",
    password: "123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profile_pic:
      "https://img.freepik.com/premium-vector/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.jpg",
    cover_pic: "",
    bio: "Software Developer",
    protfolio_link: "https://meet-shah-protfolio.netlify.app/",
    followers: [],
    following: [],
    bookmarks: [],
  },
  {
    _id: "2",
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profile_pic:
      "https://cdn.dribbble.com/users/2140475/screenshots/13654357/media/4ecc2fe772d9342bde438901293c13f5.jpg?resize=400x0",
    cover_pic: "",
    bio: "UI/UX Designer",
    protfolio_link: "https://meet-shah-protfolio.netlify.app/",
    followers: [],
    following: [],
    bookmarks: [],
  },
  {
    _id: "3",
    firstName: "Raj",
    lastName: "Shah",
    username: "rshah",
    password: "123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profile_pic: "https://randomuser.me/api/portraits/men/44.jpg",
    cover_pic: "",
    bio: "Data Analyst",
    protfolio_link: "https://meet-shah-protfolio.netlify.app/",
    followers: [],
    following: [],
    bookmarks: [],
  },
  {
    _id: "4",
    firstName: "Parth",
    lastName: "Shah",
    username: "pshah",
    password: "123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profile_pic: "https://randomuser.me/api/portraits/men/66.jpg",
    cover_pic: "",
    bio: "Backend Developer",
    protfolio_link: "https://meet-shah-protfolio.netlify.app/",
    followers: [],
    following: [],
    bookmarks: [],
  },
  {
    _id: "5",
    firstName: "Aman",
    lastName: "Shah",
    username: "ashah",
    password: "123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profile_pic: "https://randomuser.me/api/portraits/men/52.jpg",
    cover_pic: "",
    bio: "Azure Cloud Architect",
    protfolio_link: "https://meet-shah-protfolio.netlify.app/",
    followers: [],
    following: [],
    bookmarks: [],
  },
];
