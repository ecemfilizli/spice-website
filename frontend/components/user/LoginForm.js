"use client";
import { useForm } from "react-hook-form";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken, useAddUserMutation } from "@/redux/slices/authSlice";

const LoginForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [userLogin, { isLoading, error }] = useAddUserMutation();
  const [loginToken, setLoginToken] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const submitForm = async (data) => {
    try {
      const formattedData = {
        usernameOrEmail: data.usernameOrEmail,
        password: data.password,
      };
      const response = await userLogin(formattedData).unwrap();

      if (response.token?.accessToken) {
        dispatch(setToken(response.token.accessToken));
        alert("Login successful!");
        router.push("/admin");
      } else {
        alert("Wrong username or password!");
      }
      reset();
    } catch (err) {
      console.error("Adding errorı:", err);
    }
  };

  return (
    <div className="login_container">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="login_form_container"
      >
        <p className="login_form_title ">Login </p>
        <label className="login_form_content">
          <p className="login_form_span">user name && email:</p>
          <input
            type="text"
            {...register("usernameOrEmail", { required: true })}
            className="login_form_input"
          />
        </label>
        <label className="login_form_content block mt-2 w-full">
          <p className="login_form_span">password:</p>
          <input
            type="password"
            {...register("password", { required: true })}
            className="login_form_input"
          />
        </label>
        <div className="login_form_buttons">
          <button
            type="submit"
            className="login_form_buttonAdd see_item_allButton"
          >
            {isLoading ? "Log in..." : "Log in"}
          </button>
          <button
            type="submit"
            className="login_form_buttonExit see_item_allButton"
          >
            <Link href="/">return to homepage</Link>
          </button>
        </div>
      </form>
      <div className="contact_bg_green "></div>
    </div>
  );
};

export default LoginForm;
