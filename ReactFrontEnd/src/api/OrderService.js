import axios from "axios";
import { GetAPIUrl } from "./API";
const apiUrl = GetAPIUrl()
const token = localStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

class OrderService {
  //tạo order mới
  async PostOrder(order) {
    const response = await axios.post(`${apiUrl}/order`, order,config);
    return response;
  }

  //vnpay url
  async GetVnPayUrl(price) {
    const response = await axios.get(
      `${apiUrl}/order/getVNPayUrl?totalPrice=${price}`,config
    );
    return response;
  }


  //lấy order history
  async GetUserOrderHistory(id, pageNumber, pageSize, status, orderby, sort) {
    const response = await axios.get(
      `${apiUrl}/order/history/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}&status=${status}&orderby=${orderby}&sort=${sort}`,config
    );
    return response;
  }

  async GetAllOrdersDetailsForOrder(id) {
    const response = await axios.get(
      `${apiUrl}/order/${id}/orderdetails`,
      config
    );
    return response;
  }

  async CancelOrder(id) {
    const response = await axios.get(
      `${apiUrl}/order/cancel/${id}`,
      config
    );
    return response;
  }
}

export default new OrderService();
