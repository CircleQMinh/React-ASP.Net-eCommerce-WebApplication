import axios from "axios";

import { GetAPIUrl } from "./API";
const apiUrl = GetAPIUrl();
const token = localStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

class ShipperService {
  async getAvailableOrder(orderBy, sort, pageNumber, pageSize) {
    const response =
      await axios.get(`${apiUrl}/shipper/getAvailableOrders?orderby=${orderBy}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}
   
    `   ,config);
    return response;
  }
  async GetAllOrdersDetailsForOrder(id) {
    const response = await axios.get(
      `${apiUrl}/order/${id}/orderdetails`,
      config
    );
    return response;
  }
  async AcceptOrder(dto) {
    const response = await axios.post(
      `${apiUrl}/shipper/acceptOrder`,
      dto,
      config
    );
    return response;
  }
  async getAcceptedOrders(id, orderBy, sort, pageNumber, pageSize) {
    const response =
      await axios.get(`${apiUrl}/Shipper/${id}/getAcceptedOrders?orderby=${orderBy}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}
    `   ,config);
    return response;
  }
  async CompleteOrder(dto) {
    const response = await axios.post(
      `${apiUrl}/Shipper/completeOrder`,
      dto,
      config
    );
    return response;
  }

  async getHistory(id, orderBy, sort, pageNumber, pageSize) {
    const response =
      await axios.get(`${apiUrl}/Shipper/${id}/getDeliverHistory?orderby=${orderBy}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}
    `   ,config);
    return response;
  }
}

export default new ShipperService();
