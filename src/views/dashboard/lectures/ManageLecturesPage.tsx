import React from "react";
import Table from "react-data-table-component";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components";
import { Flex, Button } from "@radix-ui/themes";

const ManageLecturesPage: React.FC = () => {
  const columns = React.useMemo(() => {
    return [
      {
        name: "Actions",
        right: true,
        selector: (row: any) => row.id,
        cell: (row: any) => {
          return (
            <Flex direction="row" gap="2">
              <Button className="text-xs" variant="soft">
                Update
              </Button>
              <Button className="text-xs" color="red">
                Delete
              </Button>
            </Flex>
          );
        },
      },
    ];
  }, []);

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="Manage Lectures" subtitle="View all and manage lectures">
        <Link to="/dashboard/lectures/manage/add">
          <Button>Add Lecture</Button>
        </Link>
      </PageHeader>

      <Table columns={columns} data={[]} />
    </Flex>
  );
};

export default ManageLecturesPage;
