import axios from "axios";
import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";

export const loader = async () => {
  const response = await customFetch("/products");
  console.log(response);
  const products = response.data.data;
  const meta = response.data.meta;
  return { products, meta };
};
const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
