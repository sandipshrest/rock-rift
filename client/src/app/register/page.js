"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Input } from "@nextui-org/react";
import { toast } from "react-hot-toast";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(/[A-Z]/, "Must Contain One Uppercase character"),
  rePassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

const Register = () => {
  const handleRegister = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      console.log(result)
      if (response.status === 201) {
        toast.success(result.msg);
      } else {
        toast.error(result.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-8 justify-center items-center">
      <h1 className="text-2xl font-semibold">Signup</h1>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          rePassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          handleRegister(values);
          resetForm();
        }}
      >
        {({ errors, touched, handleChange }) => (
          <Form className="flex flex-col items-center gap-6 w-1/3">
            <div className="flex w-full gap-4">
              <div className="flex flex-col items-start w-full">
                <Input
                  type="text"
                  name="fullName"
                  variant="underlined"
                  label="Full Name"
                  onChange={handleChange}
                />
                <div className="w-full h-2">
                  {errors.fullName && touched.fullName ? (
                    <p className="text-sm text-brandColor font-medium">
                      {errors.fullName}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col items-start w-full gap-1">
                <Input
                  type="email"
                  name="email"
                  variant="underlined"
                  label="Email"
                  onChange={handleChange}
                />
                <div className="w-full h-2">
                  {errors.email && touched.email ? (
                    <p className="text-sm text-brandColor font-medium">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex w-full gap-4">
              <div className="flex flex-col items-start w-full">
                <Input
                  type="password"
                  name="password"
                  variant="underlined"
                  label="Enter Password"
                  onChange={handleChange}
                />
                <div className="w-full h-2">
                  {errors.password && touched.password ? (
                    <p className="text-sm text-brandColor font-medium">
                      {errors.password}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <Input
                  type="password"
                  name="rePassword"
                  variant="underlined"
                  label="Re-Enter Password"
                  onChange={handleChange}
                />
                <div className="w-full h-2">
                  {errors.rePassword && touched.rePassword ? (
                    <p className="text-sm text-brandColor font-medium">
                      {errors.rePassword}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-thirdColor text-white py-1 px-2"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
