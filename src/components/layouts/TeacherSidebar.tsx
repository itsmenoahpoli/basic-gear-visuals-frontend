import React from "react";
import { Link } from "react-router-dom";
import { Flex } from "@radix-ui/themes";

export const TeacherSidebar: React.FC = () => {
  return (
    <Flex direction="column" gap="1" className="mt-5">
      <Link to="/dashboard" className="h-[35px] flex items-center text-sm text-left rounded-lg hover:bg-slate-800 !pl-2">
        Dashboard
      </Link>
      <Link to="/dashboard/manage/laboratories" className="h-[35px] flex items-center text-sm text-left rounded-lg hover:bg-slate-800 !pl-2">
        Laboratories
      </Link>
    </Flex>
  );
};
