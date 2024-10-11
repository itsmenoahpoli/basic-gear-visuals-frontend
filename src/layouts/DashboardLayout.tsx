import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Theme, Flex, Box, Button, Badge } from "@radix-ui/themes";
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
            <p className="text-[10px]">
              Account Type <Badge color="amber">{userRole}</Badge>
            </p>
            <Button variant="ghost" className="!text-red-200" onClick={logout}>
              LOGOUT
            </Button>
          </Flex>
        </Flex>

        <Flex direction="row" className="w-full h-[calc(100vh-50px)]">
          <Box className="w-[300px] h-full border-r border-gray-800 px-5 pt-2">
            <p className="text-xs text-gray-400">Manage &mdash;</p>

            <Flex direction="column" gap="1" className="mt-5">
              <Link to="/dashboard/overview" className="h-[35px] flex items-center text-xs text-left rounded-lg hover:bg-slate-800 !pl-2">
                Dashboard Overview
              </Link>
              <Link to="/dashboard/manage/sections" className="h-[35px] flex items-center text-xs text-left rounded-lg hover:bg-slate-800 !pl-2">
                Sections
              </Link>
              <Link to="/dashboard/manage/students" className="h-[35px] flex items-center text-xs text-left rounded-lg hover:bg-slate-800 !pl-2">
                Students
              </Link>
              <Link to="/dashboard/manage/lectures" className="h-[35px] flex items-center text-xs text-left rounded-lg hover:bg-slate-800 !pl-2">
                Lectures
              </Link>
              <Link to="/dashboard/manage/lecture-exams" className="h-[35px] flex items-center text-xs text-left rounded-lg hover:bg-slate-800 !pl-2">
                Lecture Exams
              </Link>
              <Link
                to="/dashboard/manage/lecture-laboratories"
                className="h-[35px] flex items-center text-xs text-left rounded-lg hover:bg-slate-800 !pl-2"
              >
                Lecture Laboratories
              </Link>
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
