import axios from "axios";

// const apiUrl = "https://localhost:7251/api";
const apiUrl = "http://bookstore18110-001-site1.itempurl.com/api"
const token = localStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

class ShipperService {
  async getAvailableOrder(orderBy, sort, pageNumber, pageSize) {
    const response =
      await axios.get(`${apiUrl}/shipper/getAvailableOrders?orderby=${orderBy}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}
    `);
    return response;
  }
  async GetAllOrdersDetailsForOrder(id) {
    const response = await axios.get(
      `${apiUrl}/order/${id}/orderdetails`,
      config
    );
    return response;
  }
}

export default new ShipperService();
