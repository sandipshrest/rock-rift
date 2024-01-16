"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const ValidationSchemaExample = () => (
  <div className="w-full h-screen flex flex-col gap-8 justify-center items-center">
    <h1 className="text-2xl font-semibold">Login</h1>
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => {
        // same shape as initial values
        console.log(values);
        actions.resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col items-center gap-2">
          <Field
            name="email"
            type="email"
            className="border border-black p-1"
          />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}

          <Field
            name="password"
            type="password"
            className="border border-black p-1"
          />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
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
      Don't have an account? <Link href="/register">Create new</Link>
    </p>
  </div>
);

export default ValidationSchemaExample;
