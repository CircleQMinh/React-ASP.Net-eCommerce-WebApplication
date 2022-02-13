import axios from "axios";

import { GetAPIUrl } from "./API";
const apiUrl = GetAPIUrl()

class ProductService {
  async getProduct(pageNumber,pageSize,keyword=null,priceRange=null,genreFilter=null) {
    const response = await axios.get(`${apiUrl}/Book/search?pageNumber=${pageNumber}&pageSize=${pageSize}${keyword!=null?`&keyword=${keyword}`:""}${priceRange!=null?`&priceRange=${priceRange}`:""}${genreFilter!=null?`&genreFilter=${genreFilter}`:""}
    `);
    return response;
  }
  async getProductById(id) {
    const response = await axios.get(`${apiUrl}/Book/${id}
    `);
    return response;
  }

  async getRelatedProductById(id,number) {
    const response = await axios.get(`${apiUrl}/Book/${id}/related?numberOfBook=${number}
    `);
    return response;
  }

  // --------------------------------------------------------------------------------------------------------

  async getGenre() {
    const response = await axios.get(`${apiUrl}/Genre`);
    return response;
  }
  async getAuthor() {
    const response = await axios.get(`${apiUrl}/Author`);
    return response;
  }
  async getPublisher() {
    const response = await axios.get(`${apiUrl}/Publisher`);
    return response;
  }
}

export default new ProductService();
