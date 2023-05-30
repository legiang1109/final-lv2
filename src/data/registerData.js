// const Key = "Users";

// const saveUser = (data) => {
//   const jsonString = localStorage.getItem(Key);
//   let listUsers = JSON.parse(jsonString);
//   if (!listUsers) {
//     listUsers = [];
//   }
//   listUsers.push(data);
//   localStorage.setItem(Key, JSON.stringify(listUsers));
// };

// const getUserByUsername = () => {
//   const jsonString = localStorage.getItem(Key);
// };

// export { saveUser, getUserByUsername };

import axios from "axios";

const API_DOMAIN = "https://645ba441a8f9e4d6e76e9851.mockapi.io/api/v1/users";

const createUser = async (data) => {
  return await axios.post(API_DOMAIN, data);
};

const getUser = async (mail, password) => {
  return await axios.get(`${API_DOMAIN}`, {
    params: {
      mail: mail,
      password: password,
    },
  });
};

export { createUser, getUser };
