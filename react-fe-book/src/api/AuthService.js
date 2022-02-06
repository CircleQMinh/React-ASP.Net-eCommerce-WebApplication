import axios from "axios";

const apiUrl = "https://localhost:7251/api/account";

class AuthService {
  async Login(email, password) {
    const response = await axios.post(`${apiUrl}/login`, {
      email: email,
      password: password,
    });
    return response;
  }
  async Register(data) {
    //console.log(data);
    const response = await axios.post(`${apiUrl}/register`, {
      email: data.email,
      password: data.password,
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png",
      userName: data.userName,
      phoneNumber: data.phoneNumber,
      roles: ["User"],
    });
    return response;
  }
  async ConfimrEmail(email, token) {
    const response = await axios.post(`${apiUrl}/confirmEmail`, {
      email: email,
      token: token,
    });
    return response;
  }
  async RequestNewPassword(email) {
    const response = await axios.post(`${apiUrl}/requestNewPassword?email=${email}`);
    return response;
  }
  async ConfimrNewPassword(email, token,password) {
    const response = await axios.post(`${apiUrl}/confirmNewPassword`, {
      email: email,
      token: token,
      password:password
    });
    return response;
  }
  async TestProvider(provider, url) {
    const response = await axios.post(`${apiUrl}?provider=${provider}&returnUrl=${url}`, {
      provider: provider,
      returnUrl: url,
    });
    return response;
  }
}

export default new AuthService();
