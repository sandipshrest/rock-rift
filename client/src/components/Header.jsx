"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline, IoSearch } from "react-icons/io5";
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
import { addToSearchList } from "@/redux/reducerSlice/searchSlice";

const Header = () => {
  const inputRef = useRef(null);
  const dropdownRefs = useRef([]);
  const router = useRouter();
  const { isLogin, userDetail } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [toggleCart, setToggleCart] = useState(false);
  const [toggleWishlist, setToggleWishlist] = useState(false);
  const [searchProduct, setSearchProduct] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [showProductMenu, setShowProductMenu] = useState(false);

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

  //fetching productItems, cartItems & wishlistItems
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProductItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCarts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/carts?userId=${userDetail._id}`
      );
      setCartItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWishlists = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlists?userId=${userDetail._id}`
      );
      setWishlistItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchCarts();
    fetchWishlists();
  }, [cart, wishlist, isLogin]);

  //store product according to their category
  const categoryData = {};

  productItems?.forEach((product) => {
    if (!categoryData[product.category]) {
      categoryData[product.category] = {
        category: product.category,
        products: [product],
      };
    } else {
      categoryData[product.category].products.push(product);
    }
  });

  //  search function
  const handleSearch = async () => {
    if (inputRef.current.value === "") {
      setSearchProduct([]);
      setCurrentSelection(null);
    } else {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/search?productName=${inputRef.current.value}`
        );
        setSearchProduct(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const productSearch = () => {
    router.push(`/searchProduct?search=${inputRef.current.value}`);
    setSearchProduct([]);
  };

  const handleKeyPress = (e) => {
    if (e.key.toLowerCase() === "enter") {
      e.preventDefault();
      productSearch();
    }
  };

  useEffect(() => {
    const handleChange = (e) => {
      if (e.key === "ArrowDown") {
        if (currentSelection === null) {
          setCurrentSelection(0);
        } else if (currentSelection === searchProduct.length - 1) {
          setCurrentSelection(null);
        } else {
          setCurrentSelection(currentSelection + 1);
        }
      } else if (e.key === "ArrowUp") {
        if (currentSelection === 0) {
          setCurrentSelection(null);
        } else if (currentSelection === null) {
          setCurrentSelection(searchProduct.length - 1);
        } else {
          setCurrentSelection(currentSelection - 1);
        }
      }
    };
    if (currentSelection !== null) {
      inputRef.current.value = dropdownRefs.current[currentSelection]?.text;
    }
    window.addEventListener("keydown", handleChange);
    return () => {
      window.removeEventListener("keydown", handleChange);
    };
  }, [currentSelection]);

  return (
    <header
      className={`${
        scrolled ? "bg-white shadow-md" : ""
      } fixed top-0 w-full z-30 transition-all duration-300 ease-linear`}
    >
      <div className={`relative container flex items-center justify-between`}>
        <div className="flex items-center w-1/2 gap-14">
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
              <li
                onMouseLeave={() => setShowProductMenu(false)}
                className="py-8"
              >
                <button onMouseEnter={() => setShowProductMenu(true)}>
                  Products
                </button>
                <div
                  className={`absolute w-full left-0 bg-white border shadow-md p-8 transition-all duration-300 ease-linear ${
                    showProductMenu
                      ? "top-[88px] opacity-100"
                      : "top-24 opacity-0"
                  }`}
                >
                  <div
                    className={`w-full grid-cols-5 gap-10 ${
                      showProductMenu ? "grid" : "hidden"
                    }`}
                  >
                    {Object.values(categoryData)
                      .slice(0, 5)
                      .map((item, id) => (
                        <div key={id} className="flex flex-col gap-4">
                          {/* <img
                          src={item.thumbnailImage}
                          alt={item.category}
                          className="w-full h-48 bg-green-100 object-contain"
                        /> */}
                          <div className="flex flex-col gap-2 grow justify-between">
                            <h3 className="text-xl font-semibold border-b border-gray-400">
                              {item.category}
                            </h3>
                            <ul className="text-base">
                              {item.products
                                .slice(0, 4)
                                .map((productItem, productId) => (
                                  <li key={productId}>
                                    <Link
                                      onClick={() => setShowProductMenu(false)}
                                      href={`/products/${productItem._id}`}
                                      className="inline-block w-full p-[2px] hover:bg-gray-100"
                                    >
                                      {productItem.product}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                            <Link
                              onClick={() => setShowProductMenu(false)}
                              href={`/category/${item.category}`}
                              className="text-base text-gray-600 underline"
                            >
                              View More
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </li>
              <li>
                <Link href="/#">About</Link>
              </li>
              <li>
                <Link href="/#">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center justify-end gap-14 w-1/2">
          <div className="w-2/3 relative">
            <input
              ref={inputRef}
              onKeyDown={handleKeyPress}
              onChange={handleSearch}
              type="text"
              placeholder="Search product..."
              className="border bg-transparent focus:outline-none border-gray-700 py-1 px-2 rounded w-full"
            />
            <button onClick={productSearch}>
              <IoSearch className="absolute top-1/2 -translate-y-1/2 right-3 text-2xl" />
            </button>
            {searchProduct.length > 0 && (
              <div className="absolute flex flex-col items-start w-full bg-gray-50 shadow-md">
                {searchProduct.map((item, id) => (
                  <Link
                    ref={(element) => (dropdownRefs.current[id] = element)}
                    onClick={() => setSearchProduct([])}
                    href={`/searchProduct?search=${item.product}`}
                    key={id}
                    className={`inline-block w-full hover:bg-gray-200 p-2 font-medium ${
                      currentSelection === id ? "bg-gray-200" : ""
                    }`}
                  >
                    {item.product}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-5 items-center">
            <button
              disabled={toggleWishlist}
              onClick={() => setToggleCart(!toggleCart)}
              className="text-2xl relative"
            >
              {cartItems.length > 0 && (
                <span className="flex justify-center items-center absolute -top-2 -right-2 w-4 h-4 bg-red-600 text-[10px] text-white rounded-full">
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
                <span className="flex justify-center items-center absolute -top-2 -right-2 w-4 h-4 bg-red-600 text-[10px] text-white rounded-full">
                  {wishlistItems.length}
                </span>
              )}
              <CiHeart />
            </button>
            {isLogin ? (
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <Image
                    src={`http://localhost:5000/avatar/${userDetail._id}`}
                    alt="avatar"
                    width={2000}
                    height={2000}
                    className="size-8 object-cover object-top rounded-full"
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
                  <DropdownItem key="configurations">
                    Configurations
                  </DropdownItem>
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
      </div>
      <Cart cartItems={cartItems} toggleCart={toggleCart} />
      <Wishlist wishlistItems={wishlistItems} toggleWishlist={toggleWishlist} />
    </header>
  );
};

export default Header;
