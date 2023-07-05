import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "Paradise awaits! Just landed in the breathtaking Maldives, and I'm already in awe of the crystal-clear waters and soft sandy beaches.",
    // content_img:
    //   "https://i.pinimg.com/564x/e1/99/b2/e199b25cd826924f861cf8762eee449c.jpg",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    firstName: "Adarsh",
    lastName: "Balika",
    profile_pic:
      "https://cdn.dribbble.com/users/2140475/screenshots/13654357/media/4ecc2fe772d9342bde438901293c13f5.jpg?resize=400x0",
  },
  {
    _id: uuid(),
    content:
      "Exploring the golden dunes of the Sahara Desert on a camel's back! The tranquility and vastness of this desert are truly humbling. Magical sunset views! ",
    // content_img:
    //   "https://i.pinimg.com/564x/73/cc/88/73cc88738ddb353a08738f6b586e2359.jpg",
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    username: "rshah",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    firstName: "Raj",
    lastName: "Shah",
    profile_pic: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    _id: uuid(),
    content:
      " Embracing nature's beauty in the Canadian Rockies. Hiking through the vibrant fall foliage and gazing at the turquoise lakes is an experience like no other",
    // content_img:
    //   "https://i.pinimg.com/564x/a8/e6/68/a8e66845ec638cbdafeb3e87d4f46fe8.jpg",
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    username: "mshah",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    firstName: "Meet",
    lastName: "Shah",
    profile_pic:
      "https://img.freepik.com/premium-vector/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.jpg",
  },
  {
    _id: uuid(),
    content:
      "Journeying through the cultural wonders of India. The Taj Mahal's beauty is beyond words, and the colorful festivals are a sensory explosion! ",
    // content_img:
    //   "https://i.pinimg.com/564x/da/c4/fa/dac4fad4810e7d038cccd0d3f974b389.jpg",
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    username: "pshah",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    firstName: "Parth",
    lastName: "Shah",
    profile_pic: "https://randomuser.me/api/portraits/men/66.jpg",
  },
  {
    _id: uuid(),
    content:
      "Sailing through the stunning Greek Islands. Each island has its own unique charm and history, making it an unforgettable island-hopping adventure! ",
    // content_img:
    //   "https://i.pinimg.com/564x/1c/91/07/1c9107056d27d0adf9b2cee6816b6e1a.jpg",
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    username: "ashah",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    firstName: "Aman",
    lastName: "Shah",
    profile_pic: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];
