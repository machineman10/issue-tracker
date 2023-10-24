import { Box, Text } from "@radix-ui/themes";

const Spinner = () => {
  return (
    <Box
      className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      style={{ color: "var(--accent-12)" }}
      role="status"
    >
      <Text className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </Text>
    </Box>
  );
};

export default Spinner;
