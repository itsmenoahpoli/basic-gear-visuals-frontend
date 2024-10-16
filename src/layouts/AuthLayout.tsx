import React from "react";
import { Theme, Flex } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => {
  return (
    <Theme appearance="dark">
      <Flex justify="center" align="center" direction="column" gap="2" className="h-screen" style={{ zoom: 0.75 }}>
        <h1 className="text-2xl font-bold">BGVLabs</h1>
        <p className="mb-5">Learning Management Platform</p>

        <Outlet />

        <p className="text-sm mt-4">All Rights Reserved. &copy; 2024</p>
      </Flex>
    </Theme>
  );
};
