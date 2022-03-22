import axios from "axios";
import { GetAPIUrl,GetConfig } from "./API";

const apiUrl = GetAPIUrl()
const token = localStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

class AdminService {
  async GetOrdersForAdmin(status, orderBy, sort, pageNumber, pageSize) {
    const response = await axios.get(
      `${apiUrl}/order?status=${status}&orderby=${orderBy}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      config
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
  //admin duyệt order
  async PutOrder(dto, id) {
    const response = await axios.put(`${apiUrl}/order/${id}`, dto, config);
    return response;
  }
  //admin xóa order
  async DeleteOrder(id) {
    const response = await axios.delete(`${apiUrl}/order/${id}`, config);
    return response;
  }

  //product --- book
  async GetBooksForAdmin(genre, orderBy, sort, pageNumber, pageSize) {
    const response = await axios.get(
      `${apiUrl}/book?genre=${genre}&orderby=${orderBy}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      config
    );
    return response;
  }

  //admin thêm product
  async AddProduct(product) {
    const response = await axios.post(`${apiUrl}/book`, product, config);
    return response;
  }
  //addmin edit product
  async EditProduct(id, product) {
    const response = await axios.put(`${apiUrl}/book/${id}`, product, config);
    return response;
  }
  //admin delete product
  async DeleteProduct(id) {
    const response = await axios.delete(`${apiUrl}/book/${id}`, config);
    return response;
  }

  //promotion

  async GetPromotionForAdmin(status, orderBy, sort, pageNumber, pageSize) {
    const response = await axios.get(
      `${apiUrl}/promotion?status=${status}&orderby=${orderBy}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      config
    );
    return response;
  }
  async GetPromotionInfosForAdmin(id) {
    const response = await axios.get(
      `${apiUrl}/Promotion/${id}/promotionInfos`,
      config
    );
    return response;
  }
  async PostPromotion(promo) {
    const response = await axios.post(`${apiUrl}/promotion`, promo, config);
    return response;
  }

  async PutPromotion(promo,id){
    const response = await axios.put(`${apiUrl}/promotion/${id}`, promo, config);
    return response;
  }
  async DeletePromotion(id){
    const response = await axios.delete(`${apiUrl}/promotion/${id}`, config);
    return response;
  }

  async PostPromotionInfo(promoInfo,promoid){
    const response = await axios.post(`${apiUrl}/promotion/${promoid}/promotionInfos`, promoInfo, config);
    return response;
  }
  async PutPromotionInfo(promoInfo,id){
    const response = await axios.put(`${apiUrl}/promotion/promotionInfos/${id}`, promoInfo, config);
    return response;
  }
  async DeletePromotionInfo(id){
    const response = await axios.delete(`${apiUrl}/promotion/promotionInfos/${id}`, config);
    return response;
  }

  async GetPromotableProduct() {
    const response = await axios.get(
      `${apiUrl}/Promotion/getPromotableProduct`,
      config
    );
    return response;
  }

  // -----user----------------
  async GetUserForAdmin( orderBy, sort, pageNumber, pageSize) {
    const response = await axios.get(
      `${apiUrl}/user?orderby=${orderBy}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      config
    );
    return response;
  }
  async AddUserForAdmin(user) {
    const response = await axios.post(
      `${apiUrl}/user`,
      user,
      config
    );
    return response;
  }
  async EditUserForAdmin(id,user) {
    const response = await axios.put(
      `${apiUrl}/user/${id}`,
      user,
      config
    );
    return response;
  }
  async EditUserCoinsForAdmin(dto) {
    const response = await axios.put(
      `${apiUrl}/user/coins`,
      dto,
      config
    );
    return response;
  }
  async DeleteUserForAdmin(id) {
    const response = await axios.delete(
      `${apiUrl}/user/${id}`,
      config
    );
    return response;
  }
  async GetUserOrderForAdmin(id, orderBy, sort, pageNumber, pageSize) {
    const response = await axios.get(
      `${apiUrl}/user/${id}/history?status=all&orderby=${orderBy}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      GetConfig()
    );
    return response;
  }

  //Employee
  async GetEmpForAdmin(role,orderBy, sort, pageNumber, pageSize) {
    const response = await axios.get(
      `${apiUrl}/Employee?role=${role}&orderby=${orderBy}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      config
    );
    return response;
  }
  async CreateEmployee(e){
    const response = await axios.post(`${apiUrl}/Employee/createEmployee`, e, config);
    return response;
  }
  async CreateShipper(e){
    const response = await axios.post(`${apiUrl}/Employee/createShipper`, e, config);
    return response;
  }

  async EditEmployee(id,e){
    const response = await axios.put(`${apiUrl}/Employee/${id}`, e, config);
    return response;
  }
  async DeleteEmployee(id){
    const response = await axios.delete(`${apiUrl}/Employee/${id}`, config);
    return response;
  }

  //Discount Code
  async GetDiscountCodeForAdmin(status,type,pageNumber, pageSize) {
    const response = await axios.get(
      `${apiUrl}/Discount?status=${status}&type=${type}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      config
    );
    return response;
  }

  async PostDiscountCode(dcode){
    const response = await axios.post(`${apiUrl}/Discount`, dcode, config);
    return response;
  }
  async PutDiscountCode(dcode,id){
    const response = await axios.put(`${apiUrl}/Discount/${id}`, dcode, config);
    return response;
  }
  async DeleteDiscountCode(id){
    const response = await axios.delete(`${apiUrl}/Discount/${id}`, config);
    return response;
  }
  async PostGenerateDiscountCode(dcode){
    const response = await axios.post(`${apiUrl}/Discount/generateDiscountCode`, dcode, config);
    return response;
  }

  //Statistic

  async GetDashboardInfo(){
    const response = await axios.get(`${apiUrl}/Statistic/DashboardInfo`, config);
    return response;
  }
  async GetSaleStatistic(from,to){
    const response = await axios.get(`${apiUrl}/Statistic/SaleStatistic?from=${from}&to=${to}`, config);
    return response;
  }
  async GetOrderStatistic(from,to){
    const response = await axios.get(`${apiUrl}/Statistic/OrderStatistic?from=${from}&to=${to}`, config);
    return response;
  }
  async GetTopProductStatistic(number){
    const response = await axios.get(`${apiUrl}/Statistic/TopProduct?numberOfBook=${number}`, config);
    return response;
  }

  //Search
  async GetSearchResult(type,by,key,pageNumber,pageSize){
    const response = await axios.get(`${apiUrl}/Find?type=${type}&searchBy=${by}&keyword=${key}&pageNumber=${pageNumber}&pageSize=${pageSize}`, config);
    return response;
  }
  async GetSearchResult_User(by,key,pageNumber,pageSize){
    const response = await axios.get(`${apiUrl}/Find/user?searchBy=${by}&keyword=${key}&pageNumber=${pageNumber}&pageSize=${pageSize}`, config);
    return response;
  }

  //Genre
  async GetGenreForAdmin( orderBy, sort, pageNumber, pageSize) {
    const response = await axios.get(
      `${apiUrl}/Genre/details?orderby=${orderBy}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      GetConfig()
    );
    return response;
  }
  async AddGenreForAdmin(o) {
    const response = await axios.post(
      `${apiUrl}/genre`,
      o,
      GetConfig()
    );
    return response;
  }
  async EditGenreForAdmin(id,o) {
    const response = await axios.put(
      `${apiUrl}/genre/${id}`,
      o,
      GetConfig()
    );
    return response;
  }
  async DeleteGenreForAdmin(id) {
    const response = await axios.delete(
      `${apiUrl}/genre/${id}`,
      GetConfig()
    );
    return response;
  }
}

export default new AdminService();
