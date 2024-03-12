"use client";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { columns } from "../data/CartData";
import { useSelector } from "react-redux";

const CartTable = (props) => {
  const renderCell = useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "product":
        return (
          <div>
            <p>{product.product}</p>
          </div>
        );
      case "quantity":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {/* {product.quantity} */}
            </p>
          </div>
        );
      case "price":
        return (
          <div className="capitalize" size="sm" variant="flat">
            {product.price}
          </div>
        );
      case "action":
        return (
          <div className="relative flex items-center gap-2">
            <button
              onClick={() => props.deleteCartItem(product._id)}
              className="bg-red-600 text-white py-1 px-2 cursor-pointer active:opacity-50"
            >
              Delete
            </button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={props.cartList}>
        {(item) => (
          <TableRow key={item}>
            {(columnKey) => {
              return (
                <TableCell>
                  <div>{renderCell(item, columnKey)}</div>
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const Cart = ({ cartItems, toggleCart }) => {
  const { userDetail } = useSelector((state) => state.user);

  const deleteCartItem = async (productId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/${userDetail._id}?productId=${productId}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section
      className={`fixed w-[900px] h-screen py-14 border border-black bg-white top-0 transition-all duration-[1s] ease-linear ${
        toggleCart ? "left-0" : "-left-[900px]"
      }`}
    >
      <div className="px-10 pb-3 border-b border-black">
        <h2 className="text-2xl font-semibold">My Cart</h2>
      </div>
      <div className="px-10 pt-4">
        {cartItems.length > 0 ? (
          <CartTable cartList={cartItems} deleteCartItem={deleteCartItem} />
        ) : (
          <div>
            <h3>Your Cart is empty</h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
