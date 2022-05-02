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

  async getRandomProducts(numberOfBook=1) {
    const response = await axios.get(`${apiUrl}/Book/getRandomProduct`, {
      params: { numberOfBook }
    });
    return response;
  }

  async getPopularProducts(numberOfBook=1) {
    const response = await axios.get(`${apiUrl}/Book/getPopularProduct`,{
      params:{ numberOfBook }
    })
    return response
  }

  async getLateProducts(number=1) {
    const response = await axios.get(`${apiUrl}/Book/getLatestBook`,{
      params:{ number }
    })
    return response
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
  async getAuthorBook(name,pageNumber,pageSize) {
    const response = await axios.get(`${apiUrl}/Book/author?name=${name}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return response;
  }
  async getPublisher() {
    const response = await axios.get(`${apiUrl}/Publisher`);
    return response;
  }

  // -----------------------------------------------------------------------------------------------------------

  async addToWishList(userId, bookId, token) {
    const response = await axios.post(`${apiUrl}/Book/addToWishlist`, 
      {
        userId, 
        bookId,
      },
      { headers: { Authorization: `Bearer ${token}` }}
    )
    return response
  }

  async removeFromWishList(userId, bookId, token) {
    const response = await axios.post(`${apiUrl}/Book/removeFromWishlist`, 
      { 
        userId,
        bookId,
      },
      { headers: { Authorization: `Bearer ${token}` }}
    )
    return response
  }

  async getProductFavorite(id, pageNumber, pageSize = 6, token) {
    const response = await axios.get(`${apiUrl}/User/${id}/getWishlist`,
      {
        params: {pageNumber, pageSize},
        headers: { Authorization: `Bearer ${token}` }     
      }
    )
    return response
  }

  // ------------------------------------------------------------------------------------------------------------------ //

  async postReview(body, token) {
    const response = await axios.post(`${apiUrl}/Review`,
      {
        ...body
      },
      { headers: { Authorization: `Bearer ${token}` }}
    )
    return response
  }

  async deleteReview(body, token) {
    const response = await axios.delete(`${apiUrl}/Review`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          ...body
        }
      },
    )
    return response
  }

}

export default new ProductService();
