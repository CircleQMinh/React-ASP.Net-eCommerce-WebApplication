import axios from "axios";

const apiUrl = "https://localhost:7251/api";

class ProductService {
  async getProduct(pageNumber,pageSize,keyword=null,priceRange=null,genreFilter=null) {
    const response = await axios.get(`${apiUrl}/Book?pageNumber=${pageNumber}&pageSize=${pageSize}${keyword!=null?`&keyword=${keyword}`:""}${priceRange!=null?`&priceRange=${priceRange}`:""}${genreFilter!=null?`&genreFilter=${genreFilter}`:""}
    `);
    return response;
  }
  async getProductById(id) {
    const response = await axios.get(`${apiUrl}/Book/${id}
    `);
    return response;
  }

  // --------------------------------------------------------------------------------------------------------

  async getGenre() {
    const response = await axios.get(`${apiUrl}/Genre`);
    return response;
  }

}

export default new ProductService();
