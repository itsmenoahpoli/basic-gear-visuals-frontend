import React from "react";
import { Outlet } from "react-router-dom";
import { Theme, Flex, Box } from "@radix-ui/themes";

export const DashboardLayout: React.FC = () => {
  return (
    <Theme appearance="dark" scaling="90%">
      <Flex direction="column" className="w-full h-full">
        <Flex className="h-[50px] w-full border-b border-gray-800 bg-gray-950 px-7" align="center" justify="between">
          <p className="text-center font-bold">ADMIN DASHBOARD</p>
        </Flex>

        <Flex direction="row" className="w-full h-[calc(100vh-50px)]">
          <Box className="w-[300px] h-full border-r border-gray-800 px-5 pt-10">
            <p className="text-xs text-gray-400">Manage &mdash;</p>
          </Box>
          <Box className="w-full h-full px-3 pt-2">
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </Theme>
  );
};
