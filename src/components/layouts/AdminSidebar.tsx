import React from "react";
import { Link } from "react-router-dom";
import { Flex } from "@radix-ui/themes";

export const AdminSidebar: React.FC = () => {
  return (
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
      <Link to="/dashboard/manage/lecture-laboratories" className="h-[35px] flex items-center text-xs text-left rounded-lg hover:bg-slate-800 !pl-2">
        Laboratories
      </Link>
    </Flex>
  );
};
