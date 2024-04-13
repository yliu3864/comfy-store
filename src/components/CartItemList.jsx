import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartItemList = () => {
  const cartItems = useSelector((state) => state.cartState.cartItems);
  return (
    <>
      {cartItems.map((item) => {
        return <CartItem key={item.cartID} cartItem={item}></CartItem>;
      })}
    </>
  );
};

export default CartItemList;
