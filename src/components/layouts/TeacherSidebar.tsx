import React from "react";
import { Link } from "react-router-dom";
import { Flex } from "@radix-ui/themes";

export const TeacherSidebar: React.FC = () => {
  return (
    <Flex direction="column" gap="1" className="mt-5">
      <Link to="/dashboard/teacher/manage/lectures" className="h-[35px] flex items-center text-xs text-left rounded-lg hover:bg-slate-800 !pl-2">
        Lectures
      </Link>
      <Link to="/dashboard/teacher/manage/lecture-exams" className="h-[35px] flex items-center text-xs text-left rounded-lg hover:bg-slate-800 !pl-2">
        Lecture Exams
      </Link>
      <Link to="/dashboard/teacher/manage/students" className="h-[35px] flex items-center text-xs text-left rounded-lg hover:bg-slate-800 !pl-2">
        Students
      </Link>
    </Flex>
  );
};
