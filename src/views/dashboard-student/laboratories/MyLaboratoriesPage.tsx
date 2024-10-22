import React from "react";
import { Flex } from "@radix-ui/themes";
import { PageHeader } from "@/components";

const MyLaboratoriesPage: React.FC = () => {
  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="My Laboratories" subtitle="View all submitted laboratories" />

      <h1>No submitted laboratories yet</h1>
    </Flex>
  );
};

export default MyLaboratoriesPage;
