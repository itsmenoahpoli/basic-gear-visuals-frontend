import React from "react";
import { Outlet } from "react-router-dom";
import { Theme, Flex, Box, Button } from "@radix-ui/themes";
import { useAuth } from "@/hooks";
import { AppBreadcrumb } from "@/components";

export const DashboardLayout: React.FC = () => {
  const { userRole, logout } = useAuth();

  return (
    <Theme appearance="dark" scaling="90%">
      <Flex direction="column" className="w-full h-full">
        <Flex className="h-[50px] w-full border-b border-gray-800 bg-gray-950 px-7" align="center" justify="between">
          <p className="text-center font-bold">BASIC GEAR VISUALS</p>

          <Flex gap="6" justify="center">
            <p className="text-xs">Account Type: {userRole}</p>
            <Button variant="ghost" className="!text-red-200" onClick={logout}>
              LOGOUT
            </Button>
          </Flex>
        </Flex>

        <Flex direction="row" className="w-full h-[calc(100vh-50px)]">
          <Box className="w-[300px] h-full border-r border-gray-800 px-5 pt-2">
            <p className="text-xs text-gray-400">Manage &mdash;</p>

            <Flex direction="column" gap="1" className="mt-5">
              <button className="h-[35px] text-left hover:bg-slate-800 !pl-2">Dashboard Overview</button>
              <button className="h-[35px] text-left hover:bg-slate-800 !pl-2">Subjects</button>
              <button className="h-[35px] text-left hover:bg-slate-800 !pl-2">Lectures</button>
              <button className="h-[35px] text-left hover:bg-slate-800 !pl-2">Lecture Quizses</button>
              <button className="h-[35px] text-left hover:bg-slate-800 !pl-2">Lecture Exams</button>
              <button className="h-[35px] text-left hover:bg-slate-800 !pl-2">Lecture Laboratories</button>
              <button className="h-[35px] text-left hover:bg-slate-800 !pl-2">Sections</button>
              <button className="h-[35px] text-left hover:bg-slate-800 !pl-2">Students</button>
            </Flex>
          </Box>
          <Box className="w-full h-full px-3 pt-2">
            <AppBreadcrumb />

            <Box className="mt-7">
              <Outlet />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Theme>
  );
};
