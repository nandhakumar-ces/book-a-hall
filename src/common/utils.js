import { userDetails } from "../constants";

function authProvider() {
  let user = sessionStorage.getItem(userDetails.USERDETAILS);
  return JSON.parse(user);
}

export default authProvider;
