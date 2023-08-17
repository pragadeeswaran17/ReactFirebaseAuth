import { getUserData, removeUserData } from "./storage";

export const isAuthendicated = () => {
  return getUserData() !== null ? true : false;
};

export const logOut = () => {
  removeUserData();
};
