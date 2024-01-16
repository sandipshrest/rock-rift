import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Image from "next/image";

export default function App() {
  return (
    <></>
    // <Navbar className="container">
    //   <NavbarBrand>
    //     <Image
    //       src="/images/logo.png"
    //       priority={true}
    //       height={2000}
    //       width={2000}
    //       alt="logo"
    //       className="w-32 object-contain"
    //     />
    //   </NavbarBrand>
    //   <NavbarContent className="hidden sm:flex gap-4" justify="center">
    //     <NavbarItem>
    //       <Link color="foreground" href="#">
    //         Features
    //       </Link>
    //     </NavbarItem>
    //     <NavbarItem isActive>
    //       <Link href="#" aria-current="page">
    //         Customers
    //       </Link>
    //     </NavbarItem>
    //     <NavbarItem>
    //       <Link color="foreground" href="#">
    //         Integrations
    //       </Link>
    //     </NavbarItem>
    //   </NavbarContent>
    //   <NavbarContent justify="end">
    //     <NavbarItem className="hidden lg:flex">
    //       <Link href="/login">Login</Link>
    //     </NavbarItem>
    //     <NavbarItem>
    //       <Button as={Link} color="primary" href="/register" variant="flat">
    //         Sign Up
    //       </Button>
    //     </NavbarItem>
    //   </NavbarContent>
    // </Navbar>
  );
}
