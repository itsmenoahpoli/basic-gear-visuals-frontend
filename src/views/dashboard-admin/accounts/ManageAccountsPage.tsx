import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button } from "@radix-ui/themes";
import { PageHeader } from "@/components";

const ManageAccountsPage: React.FC = () => {
  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="Manage Accounts" subtitle="View all and manage user accounts">
        <Link to="/dashboard/manage/accounts/add">
          <Button color="blue">Add Account</Button>
        </Link>
      </PageHeader>
    </Flex>
  );
};

export default ManageAccountsPage;
