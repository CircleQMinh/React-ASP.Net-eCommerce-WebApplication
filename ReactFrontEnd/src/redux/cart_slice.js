import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { totalItem: 0, totalPrice: 0, items: [] };

const cart_slice = createSlice({
  name: "cart_slice",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      var item = action.payload;
      var existItem = state.items.find((q) => q.product.id == item.product.id);
      if (existItem) {
        existItem.quantity += item.quantity;
        state.totalItem += item.quantity;
      } else {
        state.items.push(item);
        state.totalItem += item.quantity;
      }
      toast.success("Đã thêm sản phẩm vào giỏ!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    removeFromCart(state, action) {
      var item = action.payload;
      var existItem = state.items.find((q) => q.product.id == item.product.id);
      if (existItem.quantity === 1) {
        //xóa khỏi giỏ
        state.totalItem -= item.quantity;
        state.items = state.items.filter(
          (q) => q.product.id != item.product.id
        );
      } else {
        //giảm 1
        existItem.quantity -= item.quantity;
        state.totalItem -= item.quantity;
      }
    },
    deleteFromCart(state, action) {
      var item = action.payload;
      var existItem = state.items.find((q) => q.product.id == item.product.id);
      state.totalItem -= existItem.quantity;
      state.items = state.items.filter((q) => q.product.id != item.product.id);
    },
    calculateCartTotal(state, action) {
      var total = 0;
      state.items.forEach((item) => {
        if (item.product.promotionInfo == null) {
          total += item.product.price * item.quantity;
        } else if (
          item.product.promotionInfo != null &&
          item.product.promotionInfo.promotionPercent != null
        ) {
          total +=
            (item.product.price - (item.product.price * item.promotionInfo.promotionPercent) / 100) *
            item.quantity;
        } else {
          total +=
            (item.product.price - item.product.promotionInfo.promotionAmount) *
            item.quantity;
        }
      });
      state.totalPrice = total;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    getCartFromLocalStorage(state, action) {
      var cart = localStorage.getItem("cart");

      if (cart) {
        state = JSON.parse(cart);
        console.log(JSON.parse(cart));
        console.log("Có chạy nè");
      }
    },
    resetCart(state,action){
      state.totalItem=0
      state.totalPrice=0
      state.items =  state.items.filter((q) => false);
      localStorage.setItem("cart", JSON.stringify(state));
    }
  },
});

export const cart_slice_action = cart_slice.actions;

export default cart_slice;
