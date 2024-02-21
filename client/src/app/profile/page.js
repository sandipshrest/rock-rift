"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaXmark } from "react-icons/fa6";
import Image from "next/image";

const PasswordSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  oldPassword: Yup.string().required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(/[A-Z]/, "Must Contain One Uppercase character"),
  rePassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

const page = () => {
  const { userDetail } = useSelector((state) => state.user);
  const [activeForm, setActiveForm] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = async (values) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (response.status === 201) {
        toast.success(result.msg);
      } else {
        toast.error(result.msg);
      }
    } catch (err) {
      toast.error("Failed to register!");
    }
  };

  const { handleSubmit, resetForm, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        oldPassword: "",
        password: "",
        rePassword: "",
      },
      validationSchema: PasswordSchema,
      onSubmit: (values) => {
        handlePasswordChange(values);
        resetForm();
      },
    });

  return (
    <>
      <section className="text-black bg-gray-100 relative mt-20 py-24">
        <div className="container flex items-center gap-10">
          <div className="w-1/2">
            <div className="flex flex-col items-start gap-1">
              <Image
                src={`http://localhost:5000/avatar/${userDetail._id}`}
                alt="avatar"
                width={2000}
                height={2000}
                className="size-28 object-cover object-top rounded-full"
              />
              <p className="text-2xl font-semibold">{userDetail.fullName}</p>
              <small className="text-gray-500 font-medium">
                {userDetail.email}
              </small>
              <button
                onClick={() => setActiveForm(true)}
                className="py-1 px-2 border border-gray-800 text-sm rounded"
              >
                Change Password
              </button>
            </div>
          </div>
          <div className="w-1/2"></div>
        </div>
      </section>
      <section
        className={`${
          activeForm ? "flex" : "hidden"
        } fixed w-full h-full inset-0 bg-black bg-opacity-90 z-30 justify-center items-center`}
      >
        <div
          className={`flex w-1/5 h-auto bg-white border border-black p-6 flex-col items-end gap-4`}
        >
          <button
            onClick={() => setActiveForm(false)}
            className="flex justify-center items-center border border-gray-800 h-5 w-5 rounded-full text-sm"
          >
            <FaXmark />
          </button>
          <div className="w-full flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">Change Password</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-6 w-full"
            >
              <div className="flex w-full gap-4">
                <div className="flex flex-col items-start w-full gap-1">
                  <Input
                    type="email"
                    name="email"
                    variant="underlined"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <div className="w-full h-2">
                    {errors?.email && touched?.email ? (
                      <p className="text-sm text-brandColor font-medium">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-full relative">
                <Input
                  type={`${showOldPassword ? "text" : "password"}`}
                  name="oldPassword"
                  variant="underlined"
                  label="Old password"
                  value={values.oldPassword}
                  onChange={handleChange}
                />
                <div className="w-full h-2">
                  {errors?.oldPassword && touched?.oldPassword ? (
                    <p className="text-sm text-brandColor font-medium">
                      {errors.oldPassword}
                    </p>
                  ) : null}
                </div>
                {values.oldPassword.length > 0 && (
                  <span
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="flex justify-center items-center cursor-pointer w-[20px] h-[20px] rounded-full bg-gray-200 text-xs absolute top-1/2 -translate-y-1/2 right-2"
                  >
                    <FaEye
                      className={`${
                        showOldPassword ? "inline-block" : "hidden"
                      }`}
                    />
                    <FaEyeSlash
                      className={`${
                        showOldPassword ? "hidden" : "inline-block"
                      }`}
                    />
                  </span>
                )}
              </div>
              <div className="flex flex-col items-start w-full relative">
                <Input
                  type={`${showNewPassword ? "text" : "password"}`}
                  name="password"
                  variant="underlined"
                  label="New password"
                  value={values.password}
                  onChange={handleChange}
                />
                <div className="w-full h-2">
                  {errors?.password && touched?.password ? (
                    <p className="text-sm text-brandColor font-medium">
                      {errors.password}
                    </p>
                  ) : null}
                </div>
                {values.password.length > 0 && (
                  <span
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="flex justify-center items-center cursor-pointer w-[20px] h-[20px] rounded-full bg-gray-200 text-xs absolute top-1/2 -translate-y-1/2 right-2"
                  >
                    <FaEye
                      className={`${
                        showNewPassword ? "inline-block" : "hidden"
                      }`}
                    />
                    <FaEyeSlash
                      className={`${
                        showNewPassword ? "hidden" : "inline-block"
                      }`}
                    />
                  </span>
                )}
              </div>
              <div className="flex flex-col items-start w-full relative">
                <Input
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  name="rePassword"
                  variant="underlined"
                  label="Confirm Password"
                  value={values.rePassword}
                  onChange={handleChange}
                />
                <div className="w-full h-2">
                  {errors?.rePassword && touched?.rePassword ? (
                    <p className="text-sm text-brandColor font-medium">
                      {errors.rePassword}
                    </p>
                  ) : null}
                </div>
                {values.rePassword.length > 0 && (
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="flex justify-center items-center cursor-pointer w-[20px] h-[20px] rounded-full bg-gray-200 text-xs absolute top-1/2 -translate-y-1/2 right-2"
                  >
                    <FaEye
                      className={`${
                        showConfirmPassword ? "inline-block" : "hidden"
                      }`}
                    />
                    <FaEyeSlash
                      className={`${
                        showConfirmPassword ? "hidden" : "inline-block"
                      }`}
                    />
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="bg-thirdColor text-white py-1 px-2"
              >
                Confirm Change
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
