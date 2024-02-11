"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/reducerSlice/userSlice";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import { useRouter } from "next/navigation";
import axios from "axios";

const Header = () => {
  const { isLogin, userDetail } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [toggleCart, setToggleCart] = useState(false);
  const [toggleWishlist, setToggleWishlist] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setScrolled(scrollTop > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchCarts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/carts");
      setCartItems(data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const fetchWishlists = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/wishlists");
      setWishlistItems(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCarts();
    fetchWishlists();
  }, []);

  return (
    <header
      className={`${
        scrolled ? "bg-white shadow-md" : ""
      } py-3 fixed top-0 w-full z-30 transition-all duration-300 ease-linear`}
    >
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
          <ul className="flex items-center font-semibold gap-6">
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
          <button
            disabled={toggleWishlist}
            onClick={() => setToggleCart(!toggleCart)}
            className="text-2xl relative"
          >
            {cartItems.length > 0 && (
              <span className="flex justify-center items-center absolute -top-2 -right-2 w-4 h-4 bg-red-600 text-xs text-white rounded-full">
                {cartItems.length}
              </span>
            )}
            <IoCartOutline />
          </button>
          <button
            disabled={toggleCart}
            onClick={() => setToggleWishlist(!toggleWishlist)}
            className="text-2xl relative"
          >
            {wishlistItems.length > 0 && (
              <span className="flex justify-center items-center absolute -top-2 -right-2 w-4 h-4 bg-red-600 text-xs text-white rounded-full">
                {wishlistItems.length}
              </span>
            )}
            <CiHeart />
          </button>
          {isLogin ? (
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  }}
                  className="transition-transforml"
                  name={userDetail.fullName}
                  classNames={{
                    name: "text-lg font-semibold",
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">{userDetail.email}</p>
                </DropdownItem>
                <DropdownItem as={Link} href="/profile" key="settings">
                  My Profile
                </DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    dispatch(logoutUser());
                    router.push("/");
                  }}
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
      <Cart toggleCart={toggleCart} />
      <Wishlist toggleWishlist={toggleWishlist} />
    </header>
  );
};

export default Header;
