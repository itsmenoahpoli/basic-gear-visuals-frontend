import React from "react";
import { Link } from "react-router-dom";
import { Flex } from "@radix-ui/themes";

export const StudentSidebar: React.FC = () => {
  return (
    <Flex direction="column" gap="1" className="mt-5 w-full max-w-[200px] md:max-w-[250px] flex-shrink-0">
      <Link to="/dashboard/laboratories/browse" className="h-[35px] flex items-center text-xs text-left rounded-lg hover:bg-slate-800 !pl-2">
        Lectures
      </Link>
    </Flex>
  );
};
