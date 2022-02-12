import axios from "axios";

const apiUrl = "https://api.jikan.moe/v4/top";

class FirstAPI {
  // getAnime(){
  //     return axios.get(`${apiUrl}/anime`);
  // }
  getManga() {
    return axios.get(`${apiUrl}/manga`);
  }

  async getAnime() {
    const response = await axios.get(`${apiUrl}/anime`);
    return response.data;
  }

  // createEmployee(employee){
  //     return axios.post(apiUrl, employee);
  // }

  // getEmployeeById(employeeId){
  //     return axios.get(apiUrl + '/' + employeeId);
  // }

  // updateEmployee(employee, employeeId){
  //     return axios.put(apiUrl + '/' + employeeId, employee);
  // }

  // deleteEmployee(employeeId){
  //     return axios.delete(apiUrl + '/' + employeeId);
  // }
}

export default new FirstAPI();
