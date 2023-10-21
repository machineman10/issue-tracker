"use client";

import { Skeleton } from "@/app/components";
import {
  Avatar,
  Box,
  Container,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
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
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
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
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="2.6rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="navlink" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <Avatar
            src={session?.user?.image!}
            fallback="?"
            radius="full"
            className="cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <Text>{session?.user?.email}</Text>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </Box>
  );
};

export default NavBar;
