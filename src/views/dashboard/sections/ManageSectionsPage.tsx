import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button, Table, Badge } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useSectionsService } from "@/services";

const ManageSectionsPage: React.FC = () => {
  const { getSections, deleteSection } = useSectionsService();

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    await getSections().then((data) => setData(data));
  };

  const confirmDeleteSection = async (id: number) => {
    if (confirm("Do you confirm to delete this record?")) {
      await deleteSection(id);
    }
  };

  const StatusBadge: React.FC<{ status: "draft" | "published" }> = (props) => {
    return <Badge color={props.status === "published" ? "green" : "amber"}>{props.status.toUpperCase()}</Badge>;
  };

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="Manage Sections" subtitle="View all and manage sections">
        <Link to="/dashboard/manage/sections/add">
          <Button>Add Section</Button>
        </Link>
      </PageHeader>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.length
            ? data.map((d: any) => (
                <Table.Row key={d.id}>
                  <Table.RowHeaderCell>{d.title}</Table.RowHeaderCell>
                  <Table.Cell>
                    <StatusBadge status={d.status} />
                  </Table.Cell>
                  <Table.Cell>
                    <Flex direction="row" gap="2">
                      <Link to={`/dashboard/manage/sections/${d.id}/edit`}>
                        <Button className="text-xs" variant="soft">
                          Update
                        </Button>
                      </Link>
                      <Button className="text-xs" color="red" onClick={() => confirmDeleteSection(d.id)}>
                        Delete
                      </Button>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))
            : null}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default ManageSectionsPage;
