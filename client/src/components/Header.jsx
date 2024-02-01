"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/reducerSlice/userSlice";

const Header = () => {
  const { isLogin, userDetail } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <header className="py-3 fixed top-0 w-full bg-white z-30 border-b border-gray-300">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/logo.png"
            priority={true}
            height={2000}
            width={2000}
            alt="logo"
            className="w-28"
          />
        </Link>
        <nav>
          <ul className="flex items-center font-medium gap-6">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/#">Category</Link>
            </li>
            <li>
              <Link href="/#">About</Link>
            </li>
            <li>
              <Link href="/#">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-5 items-center">
          <Link href="/#" className="text-xl">
            <IoCartOutline />
          </Link>
          <Link href="/#" className="text-xl">
            <CiHeart />
          </Link>
          {isLogin ? (
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  }}
                  className="transition-transform"
                  description={userDetail.email}
                  name={userDetail.fullName}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">{userDetail.email}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  onClick={() => dispatch(logoutUser())}
                  key="logout"
                  color="danger"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Link href="/login" className="text-xl">
              <FaRegUser />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
