"use client";

import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="flex border-b mb-5 px-5 h-12 items-center gap-6">
      <h1>
        <Link href="/">
          <AiFillBug />
        </Link>
      </h1>
      <ul className="flex gap-6">
        {links.map((link, i) => (
          <li
            key={i}
            className={classNames({
              navlink: true,
              active: link.href === currentPath,
            })}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
