import React from "react";
import { Link, useParams } from "react-router-dom";
import { Flex, Button, Table, Badge } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useAccountsService } from "@/services";

const ManageAccountsPage: React.FC = () => {
  const { getAccounts } = useAccountsService();
  const { accountType } = useParams<{ accountType: "teacher" | "student" }>();

  const [data, setData] = React.useState<any>([]);

  React.useEffect(() => {
    getAccounts(accountType).then((data) => setData(data));

    console.log("getAccounts");
  }, [accountType]);

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="Manage Accounts" subtitle="View all and manage user accounts">
        <Link to="/dashboard/manage/accounts/add">
          <Button color="blue">Add Account</Button>
        </Link>
      </PageHeader>

      <Flex direction="column" gap="2">
        <Table.Root>
          <Table.Header>
            <Table.Row className="border-t border-b border-zinc-900">
              <Table.ColumnHeaderCell className="text-zinc-900">Account Type</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-zinc-900">Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-zinc-900">E-mail</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-zinc-900">Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.length ? (
              data.map((d: any) => (
                <Table.Row key={d.id}>
                  <Table.RowHeaderCell className="text-zinc-900">
                    <Badge color="blue" variant="solid" className="!uppercase">
                      {d.account_type}
                    </Badge>
                  </Table.RowHeaderCell>
                  <Table.RowHeaderCell className="text-zinc-900">{d.name}</Table.RowHeaderCell>
                  <Table.RowHeaderCell className="text-zinc-900">{d.email}</Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex direction="row" gap="2">
                      <Button className="text-xs" color="blue" variant="classic" disabled>
                        Update
                      </Button>
                      <Button className="text-xs" color="red" variant="classic" disabled>
                        Delete
                      </Button>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={4} className="text-center font-bold text-zinc-900">
                  NO DATA
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Flex>
    </Flex>
  );
};

export default ManageAccountsPage;
