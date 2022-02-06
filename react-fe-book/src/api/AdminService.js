import axios from "axios";

const apiUrl = "https://localhost:7251/api";

class AdminService {
  async GetOrdersForAdmin(status, orderBy, sort, pageNumber, pageSize) {
    const response = await axios.get(
      `${apiUrl}/order?status=${status}&orderby=${orderBy}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response;
  }
  async GetAllOrdersDetailsForOrder(id) {
    const response = await axios.get(
      `${apiUrl}/order/${id}/orderdetails`
    );
    return response;
  }
}

export default new AdminService();
