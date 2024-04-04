import { Link, useLoaderData } from "react-router-dom";
import { customFetch, formatPrice, generateOption } from "../utils";
import { useState } from "react";

export const loader = async ({ params }) => {
  const resp = await customFetch(`/products/${params.id}`);
  console.log(resp.data.data);
  return { product: resp.data.data };
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { image, title, price, colors, company, description } =
    product.attributes;
  const dollarsAmount = formatPrice(price);
  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const addToBag = () => {};

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover lg:w-full"
        />

        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{dollarsAmount}</p>
          <p className="mt-6 leading-8">{description}</p>
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((c) => {
                return (
                  <button
                    key={c}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      c === color && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  ></button>
                );
              })}
            </div>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium -tracking-wider">Amount</h4>
            </label>
            <select
              id="amount"
              className="select select-secondary select-bordered select-md"
              value={amount}
              onChange={handleAmount}
            >
              {generateOption(3)}
            </select>
          </div>
          <div className="mt-10">
            <button
              className="btn btn-secondary btn-md"
              onClick={() => addToBag()}
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
