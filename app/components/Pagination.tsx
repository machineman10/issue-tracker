"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  totalItem: number;
  itemPerPage: number;
  currentPage: number;
}

const Pagination = ({ totalItem, itemPerPage, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPage = Math.ceil(totalItem / itemPerPage);

  const goToPage = (pageIndex: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageIndex.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex align="center" gap="2">
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => goToPage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>

      <Text ml="8" mr="8">
        Page {currentPage} of {totalPage}
      </Text>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === totalPage}
        onClick={() => goToPage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === totalPage}
        onClick={() => goToPage(totalPage)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
