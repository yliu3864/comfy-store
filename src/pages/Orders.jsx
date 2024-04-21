import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import SectionTitle from "../components/SectionTitle";
import { PaginationContainer, OrderList } from "../components";

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("login first");
      return redirect("/login");
    }
    console.log(request);
    // const params = Object.fromEntries([
    //   ...new URL(request.url).searchParams.entries(),
    // ]);
    // console.log(params);
    try {
      const response = await customFetch.get("/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      return null;
    }
  };
const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle text="please make a order" />;
  }
  return (
    <>
      <SectionTitle text="Your order" />
      <OrderList />
      <PaginationContainer />
    </>
  );
};

export default Orders;
