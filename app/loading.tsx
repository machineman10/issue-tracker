import { Flex } from "@radix-ui/themes";
import { Spinner } from "./components";

const loading = () => {
  return (
    <Flex justify="center">
      <Spinner h="6" w="6" />
    </Flex>
  );
};

export default loading;
