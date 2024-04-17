import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultSlice = {
  cartItems: [],
  numItemsCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocal = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultSlice;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocal(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      if (item) {
        item.amount = Number(item.amount) + Number(product.amount);
      } else {
        state.cartItems.push(product);
      }
      state.numItemsCart = Number(product.amount) + state.numItemsCart;
      state.cartTotal += product.price * product.amount;

      cartSlice.caseReducers.calculateTotal(state);

      toast.success("item added to cart");
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultSlice));
      return defaultSlice;
    },
    removeCart: (state, action) => {
      const { cartID } = action.payload;
      const product = state.cartItems.find((i) => i.cartID == cartID);
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);

      state.numItemsCart = state.numItemsCart - Number(product.amount);
      state.cartTotal -= product.price * product.amount;

      cartSlice.caseReducers.calculateTotal(state);
      toast.error("item removed from cart");
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);
      state.numItemsCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;

      cartSlice.caseReducers.calculateTotal(state);
      toast.success("item updated");
    },
    calculateTotal: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal =
        Number(state.cartTotal) + Number(state.shipping) + Number(state.tax);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeCart, editItem } = cartSlice.actions;

export default cartSlice.reducer;
