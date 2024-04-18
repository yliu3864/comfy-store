import { CheckoutForm } from "../components";
import { useSelector } from "react-redux";
import CartTotals from "../components/CartTotals";
import SectionTitle from "../components/SectionTitle";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("must login first");
    return redirect("/login");
  }
  return null;
};

const Checkout = () => {
  const cartTotal = useSelector((state) => state.cartState);
  if (cartTotal == 0) return <SectionTitle text="cart is empty"></SectionTitle>;
  return (
    <>
      <SectionTitle text="place your order"></SectionTitle>
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;
