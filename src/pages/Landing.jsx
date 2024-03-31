import { FeatureProduct, Hero } from "../components";
import { customFetch } from "../utils";

const url = "/products?feature=true";

export const loader = async () => {
  const response = await customFetch(url);
  const products = response.data.data;
  return { products };
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeatureProduct />
    </>
  );
};

export default Landing;
