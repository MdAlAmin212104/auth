import Link from "next/link";
import React from "react";

const Navbar = () => {

    const nav = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "About Us",
            href: "/about",
        },
        {
            label: "Contact Us",
            href: "/contact",
        },
        {
            label: "Login",
            href: "/login",
        },
    ]
  return (
    <div className="bg-base-100">
        <div className="navbar container mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {
                nav.map((item) => {
                    return (
                        <li key={item.label}>
                            <Link href={item.href}>{item.label}</Link>
                        </li>
                    )
                })
            }
          </ul>
        </div>
        <Link href='/' className="btn btn-ghost text-xl">Logo section</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        {
                nav.map((item) => {
                    return (
                        <li key={item.label}>
                            <Link href={item.href}>{item.label}</Link>
                        </li>
                    )
                })
            }
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
