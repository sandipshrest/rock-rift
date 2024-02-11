"use client";
import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/reducerSlice/userSlice";
import { useRouter } from "next/navigation";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (response.status === 201) {
        toast.success(result.msg);
        dispatch(loginUser(result));
        router.push("/");
      } else {
        toast.error(result.msg);
      }
    } catch (err) {
      toast.error("Filed to login!");
    }
  };

  const { handleSubmit, resetForm, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit: (values) => {
        handleLogin(values);
        resetForm();
      },
    });
  return (
    <div className="w-full h-screen flex flex-col gap-8 justify-center items-center">
      <h1 className="text-2xl font-semibold">Login</h1>
      <Formik>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3 w-1/5"
        >
          <div className="flex flex-col items-start w-full">
            <Input
              type="email"
              name="email"
              variant="underlined"
              label="Email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </div>
          <div className="flex flex-col items-start w-full relative">
            <Input
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              variant="underlined"
              label="Enter Password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            {values.password.length > 0 && (
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="flex justify-center items-center cursor-pointer w-[20px] h-[20px] rounded-full bg-gray-200 text-xs absolute top-1/2 -translate-y-1/2 right-2"
              >
                <FaEye
                  className={`${showPassword ? "inline-block" : "hidden"}`}
                />
                <FaEyeSlash
                  className={`${showPassword ? "hidden" : "inline-block"}`}
                />
              </span>
            )}
          </div>

          <button type="submit" className="bg-thirdColor text-white py-1 px-2">
            Login
          </button>
        </form>
      </Formik>
      <p>
        Don't have an account?{" "}
        <Link href="/register" className="font-medium text-red-600 underline">
          Create new
        </Link>
      </p>
    </div>
  );
};

export default Login;
