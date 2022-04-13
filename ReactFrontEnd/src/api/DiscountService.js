import axios from "axios";
import { GetAPIUrl } from "./API";
const apiUrl = GetAPIUrl()
const token = localStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

class DiscountService {

  //Nhập mã giảm giá (khách)
  async ApplyDiscountCode(code) {
    const response = await axios.get(
      `${apiUrl}/discount/applyDiscountCode?code=${code}`,config
    );
    return response;
  }
  async RedeemDiscountCode(dc) {
    const response = await axios.post(
      `${apiUrl}/discount/redeemDiscountCode`,dc,config
    );
    return response;
  }


}

export default new DiscountService();
