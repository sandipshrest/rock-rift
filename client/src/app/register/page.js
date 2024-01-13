"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";

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

const ValidationSchemaExample = () => (
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
      onSubmit={(values, actions) => {
        // same shape as initial values
        console.log(values);
        actions.resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col items-center gap-6 w-1/3">
          <div className="flex w-full gap-4">
            <div className="flex flex-col items-start w-full">
              <Field
                name="fullName"
                type="text"
                placeholder="Full name"
                className="border border-gray-600 rounded-sm p-2 w-full focus:outline-none"
              />
              <div className="w-full h-2">
                {errors.fullName && touched.fullName ? (
                  <p className="text-sm text-red-600 font-medium">{errors.fullName}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col items-start w-full gap-1">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="border border-gray-600 rounded-sm p-2 w-full focus:outline-none"
              />
              <div className="w-full h-2">
                {errors.email && touched.email ? <p className="text-sm text-red-600 font-medium">{errors.email}</p> : null}
              </div>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="flex flex-col items-start w-full">
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="border border-gray-600 rounded-sm p-2 w-full focus:outline-none"
              />
              <div className="w-full h-2">
                {errors.password && touched.password ? (
                  <p className="text-sm text-red-600 font-medium">{errors.password}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col items-start w-full">
              <Field
                name="rePassword"
                type="password"
                placeholder="Re-Enter Password"
                className="border border-gray-600 rounded-sm p-2 w-full focus:outline-none"
              />
              <div className="w-full h-2">
                {errors.rePassword && touched.rePassword ? (
                  <p className="text-sm text-red-600 font-medium">{errors.rePassword}</p>
                ) : null}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gray-900 text-white py-1 px-2 rounded-md"
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

export default ValidationSchemaExample;
