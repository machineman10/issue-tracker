"use client";

import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const { status, data: session } = useSession();
  const currentPath = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="border-b mb-5 py-6">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="6">
            <Heading>
              <Link href="/">
                <AiFillBug />
              </Link>
            </Heading>
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
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href="/api/auth/signout">Logout</Link>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
