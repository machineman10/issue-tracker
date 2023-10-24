import { Flex } from "@radix-ui/themes";
import { Spinner } from "./components";

const loading = () => {
  return (
    <Flex justify="center">
      <Spinner />
    </Flex>
  );
};

export default loading;
