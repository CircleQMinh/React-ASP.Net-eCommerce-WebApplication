import axios from "axios";
import { GetAPIUrl } from "./API";
const apiUrl = GetAPIUrl()
const token = localStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

class UserService {

  async GetUserInfo(id) {
    const response = await axios.get(`${apiUrl}/User/${id}`,config);
    return response;
  }

  async EditUser(id,user) {
    const response = await axios.put(
      `${apiUrl}/user/${id}`,
      user,
      config
    );
    return response;
  }

}

export default new UserService();
