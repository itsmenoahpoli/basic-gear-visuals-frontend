import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button, Table, Badge } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useStudentsService } from "@/services";

const ManageLectureLaboratoriesPage: React.FC = () => {
  const { getStudents, deleteStudent } = useStudentsService();

  const [data, setData] = React.useState([]);

  const fetchStudents = async () => {
    // await getStudents().then((data) => setData(data));
  };

  const confirmDeleteStudent = async (id: number) => {
    if (confirm("Do you confirm to delete this record?")) {
      await deleteStudent(id);
    }
  };

  React.useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="Manage Laboratories" subtitle="View all and manage laboratories" />

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Subject</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.length ? (
            data.map((d: any) => (
              <Table.Row key={d.id}>
                <Table.RowHeaderCell>{d.title}</Table.RowHeaderCell>
                <Table.Cell>Section</Table.Cell>
                <Table.Cell>
                  <Flex direction="row" gap="2">
                    <Link to={`/dashboard/manage/lectures/${d.id}/edit`}>
                      <Button className="text-xs" variant="soft">
                        Update
                      </Button>
                    </Link>
                    <Button className="text-xs" color="red" onClick={() => confirmDeleteStudent(d.id)}>
                      Delete
                    </Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={4} className="text-center font-bold">
                NO DATA
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default ManageLectureLaboratoriesPage;
