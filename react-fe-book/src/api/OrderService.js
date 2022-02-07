import axios from "axios";

const apiUrl = "https://localhost:7251/api";

class OrderService {
  //tạo order mới
  async PostOrder(order) {
    const response = await axios.post(`${apiUrl}/order`,  order);
    return response;
  }

  //vnpay url
  async GetVnPayUrl(price) {
    const response = await axios.get(`${apiUrl}/order/getVNPayUrl?totalPrice=${price}`);
    return response;
  }


}

export default new OrderService();
