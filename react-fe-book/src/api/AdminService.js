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
  async GetBooksForAdmin(genre, orderBy, sort, pageNumber, pageSize) {
    const response = await axios.get(
      `${apiUrl}/book?genre=${genre}&orderby=${orderBy}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response;
  }
  
  //admin duyệt order
  async PutOrder(dto,id) {
    const response = await axios.put(`${apiUrl}/order/${id}`,  dto);
    return response;
  }
  //admin xóa order
  async DeleteOrder(id){
    const response = await axios.delete(`${apiUrl}/order/${id}`);
    return response;
  }

  //admin thêm product
  async AddProduct(product){
    const response = await axios.post(`${apiUrl}/book`,product);
    return response;
  }
  //addmin edit product
  async EditProduct(id,product){
    const response = await axios.put(`${apiUrl}/book/${id}`,product);
    return response;
  }
  //admin delete product
  async DeleteProduct(id){
    const response = await axios.delete(`${apiUrl}/book/${id}`);
    return response;
  }
}

export default new AdminService();
