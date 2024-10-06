import React from "react";
import { Flex, Spinner } from "@radix-ui/themes";

const OverviewPage: React.FC = () => {
  return (
    <Flex justify="center" align="center" direction="column" gap="5">
      <Spinner size="3" />
      <p>Fetching overview data ...</p>
    </Flex>
  );
};

export default OverviewPage;
