import React from "react";
import { Theme, Flex } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => {
  return (
    <Theme appearance="dark">
      <Flex justify="center" align="center" direction="column">
        <Outlet />

        <p>All Rights Reserved. &copy; 2024</p>
      </Flex>
    </Theme>
  );
};
