import React, { useState } from "react";
import { ProductPrice } from "../ProductPrice";
import { useNavigate } from "react-router-dom";
import styles from "./productInfo.module.css";
import { useSelector, useDispatch } from "react-redux";
import {  cart_slice_action } from "../../../redux/cart_slice.js";

export const ProductInfo = (props) => {
    const { book } = props;

    const [productHover, setProductHover] = useState(-1)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function onClickAddToCart(event){
        event.preventDefault()
        var item = {product: book, quantity:1}
        console.log("item", item)
        dispatch(cart_slice_action.addToCart(item))
        dispatch(cart_slice_action.calculateCartTotal())
    }

    const redirectDetailProduct = (id) => {
        window.scrollTo(0,0)
        navigate(`/book/${id}`)
    }

    return (
        <div 
            className={`${"card"} ${styles.cartContainer} ${productHover === 1 && styles.borderStyle}`}
            onMouseLeave={()=>setProductHover(-1)}
            onMouseEnter={()=>setProductHover(1)}
        >
        <div style={{ position: 'relative' }}> 
          <img
            src={book?.imgUrl || "https://picsum.photos/200/200"}
            className="card-img-top"
            alt={`Product ${book.id}`}
            onClick={()=>{ book.id && redirectDetailProduct(book.id)}}
          />
          {productHover === 1 && 
            <div className={styles.functionWrapper}>
              <button 
                className={`btn btn-primary ${styles.iconSearch} fa fa-search animate__animated animate__fadeIn animate__faster`}
                onClick={()=>{ book.id && redirectDetailProduct(book.id)}}
              >
              </button>
              <div className={`${styles.addToCartWrapper} animate__animated animate__fadeIn animate__faster`}>
                <button className={`btn btn-primary ${styles.addToCart}`} onClick={onClickAddToCart}>Thêm vào giỏ</button>
                <button className={`btn btn-primary ${styles.iconHeart}`}><i class="fa-solid fa-heart"></i></button>
              </div>
            </div>
          }
          <div className={`${styles.iconHeartTablet}`}><i class="fa-regular fa-heart"></i></div>
        </div>
        <div className={`${"card-body"}`}>
          <h5 className={`${styles.productName}`}
            onClick={()=>{ book.id && redirectDetailProduct(book.id)}}
          >{book.title}</h5>
          {/* <div className={styles.price}>{formatCurrencyVN(item.price)}</div> */}
          <div className={styles.priceWrapper}>
            <ProductPrice book={book} />
          </div>
          {/* hiển thị ở màn hình tablet */}
          <div className={styles.functionWrapperTablet}>
            <button className={`btn btn-primary`} onClick={onClickAddToCart}>Thêm vào giỏ</button>
          </div>
        </div>
      </div>
    )
}