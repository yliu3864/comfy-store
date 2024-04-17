import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    const res = await customFetch.post("auth/local/register", data);
    toast.success("created successfully");
    return redirect("/login");
  } catch (error) {
    return console.log(error);
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput
          type="text"
          label="username"
          name="username"
          defaultValue="yange_1"
        ></FormInput>
        <FormInput
          type="email"
          label="email"
          name="email"
          defaultValue="yange_1@qq.ca"
        ></FormInput>
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="123456"
        ></FormInput>
        <div className="mt-4">
          <SubmitBtn text="register"></SubmitBtn>
        </div>
        <p className="text-center">
          Already a member ?{" "}
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
