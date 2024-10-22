import React from "react";
import { Link } from "react-router-dom";
import { Flex } from "@radix-ui/themes";

export const AdminSidebar: React.FC = () => {
  return (
    <Flex direction="column" gap="1" className="mt-5">
      <Link to="/dashboard" className="h-[35px] flex items-center text-xs text-left rounded-lg hover:bg-slate-800 !pl-2">
        Dashboard
      </Link>
      <Link to="/dashboard/manage/accounts/teacher" className="h-[35px] flex items-center text-xs text-left rounded-lg hover:bg-slate-800 !pl-2">
        Accounts (Teachers)
      </Link>
      <Link to="/dashboard/manage/accounts/student" className="h-[35px] flex items-center text-xs text-left rounded-lg hover:bg-slate-800 !pl-2">
        Accounts (Students)
      </Link>
    </Flex>
  );
};
