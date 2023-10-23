import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

interface Props {
  totalItem: number;
  itemPerPage: number;
  currentPage: number;
}

const Pagination = ({ totalItem, itemPerPage, currentPage }: Props) => {
  const totalPage = Math.ceil(totalItem / itemPerPage);

  return (
    <Flex align="center" gap="2">
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>

      <Text ml="8" mr="8">
        Page {currentPage} of {totalPage}
      </Text>

      <Button color="gray" variant="soft" disabled={currentPage === totalPage}>
        <ChevronRightIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === totalPage}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
