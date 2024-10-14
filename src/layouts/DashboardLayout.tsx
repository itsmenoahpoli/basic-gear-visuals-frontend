import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Theme, Flex, Box, Button, Badge } from "@radix-ui/themes";
import { useAuth } from "@/hooks";
import { AppBreadcrumb, AdminSidebar, TeacherSidebar, StudentSidebar } from "@/components";

export const DashboardLayout: React.FC = () => {
  const { checkAuth, userRole, logout } = useAuth();

  if (!checkAuth()) {
    return <Navigate to="/auth/signin" />;
  }

  const RenderSidebar: React.FC<{ userRole: "admin" | "teacher" | "student" }> = (props) => {
    if (props.userRole === "teacher") return <TeacherSidebar />;
    if (props.userRole === "student") return <StudentSidebar />;

    return <AdminSidebar />;
  };

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

            <RenderSidebar userRole="student" />
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
