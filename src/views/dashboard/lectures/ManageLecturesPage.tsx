import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button, Table } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useLecturesService } from "@/services";
import { APP_URL } from "@/constants";

const ManageLecturesPage: React.FC = () => {
  const { getLectures, deleteLecture } = useLecturesService();

  const [data, setData] = React.useState([]);

  const fetchLectures = async () => {
    await getLectures().then((data) => setData(data));
  };

  const confirmDeleteLecture = async (id: number) => {
    if (confirm("Do you confirm to delete this record?")) {
      await deleteLecture(id);
    }
  };

  const getModuleSrcUrl = (path: string) => {
    return APP_URL + path;
  };

  React.useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="Manage Lectures" subtitle="View all and manage lectures">
        <Link to="/dashboard/manage/lectures/add">
          <Button>Add Lecture</Button>
        </Link>
      </PageHeader>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Module File (Link to download)</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.length ? (
            data.map((d: any) => (
              <Table.Row key={d.id}>
                <Table.RowHeaderCell>{d.title}</Table.RowHeaderCell>
                <Table.Cell>{d.description}</Table.Cell>
                <Table.Cell>
                  <a href={getModuleSrcUrl(d.module_src)} className="text-xs text-blue-500 underline" download>
                    Click to download
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <Flex direction="row" gap="2">
                    <Link to={`/dashboard/manage/lectures/${d.id}/edit`}>
                      <Button className="text-xs" variant="soft">
                        Update
                      </Button>
                    </Link>
                    <Button className="text-xs" color="red" onClick={() => confirmDeleteLecture(d.id)}>
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

export default ManageLecturesPage;
