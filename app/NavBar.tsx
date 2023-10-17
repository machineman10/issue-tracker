import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  return (
    <nav className="flex border-b mb-5 px-5 h-12 items-center gap-6">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex gap-6">
        <li>
          <Link href="/" className="navlink">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/issues" className="navlink">
            Issues
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
