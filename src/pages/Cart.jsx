import { useSelector } from "react-redux";
import SectionTitle from "../components/SectionTitle";
import { CartItemList } from "../components";
import CartTotals from "../components/CartTotals";
import { Link } from "react-router-dom";

const Cart = () => {
  const user = useSelector((state) => state.userState.user);
  const numItemsInCart = useSelector((state) => state.cartState.numItemsCart);
  if (numItemsInCart === 0) {
    return <SectionTitle text="empty cart"></SectionTitle>;
  }

  return (
    <>
      <SectionTitle text="Shopping cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              Process to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              Please to login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
