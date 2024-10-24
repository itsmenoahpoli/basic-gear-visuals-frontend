import React from "react";
import { format } from "date-fns";
import { Button, Flex, Table } from "@radix-ui/themes";
import { APP_URL } from "@/constants";

type Props = {
  title: string;
  data: any;
  onClose: () => void;
};

export const LaboratorySubmissions: React.FC<Props> = (props) => {
  const formatDate = (dateStr: string) => {
    return format(dateStr, "MMMM dd yyyy hh:mm a");
  };

  const getModuleSrcUrl = (path: string) => {
    return APP_URL + path;
  };

  const renderLaboratoryOutputs = (outputs: string, labs: string) => {
    console.log(outputs, labs);
    if (outputs && labs) {
      const parsedOutputs = JSON.parse(outputs);
      const parsedLabs = JSON.parse(labs);

      const getLab = (index: number) => {
        return parsedLabs[index].url;
      };

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parsedOutputs.map((output: any, index: number) => (
            <Flex direction="column" gap="2">
              <small>Output for - {getLab(index)}</small>
              <img src={getModuleSrcUrl(output)} alt={output} key={`img-${output}`} className="w-[200px] h-[200px]" />
            </Flex>
          ))}
        </div>
      );
    }

    return "N/A";
  };

  return (
    <div className="w-full bg-slate-200 my-8">
      <div className="w-full min-h-[300px] max-h-[600px] overflow-auto border rounded-md shadow-md p-5">
        <Flex justify="between">
          <Flex direction="column" gap="2">
            <h1 className="text-xl font-bold">Submissions for lecture</h1>
            <h1 className="text-md font-medium">{props.title}</h1>
          </Flex>

          <Button variant="classic" onClick={props.onClose}>
            Close
          </Button>
        </Flex>

        <div className="w-full mt-8">
          <Table.Root>
            <Table.Header>
              <Table.Row className="border-t border-b border-zinc-900">
                <Table.ColumnHeaderCell className="text-zinc-900">Submitted by</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="text-zinc-900">Date of submission</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="text-zinc-900">Laboratory quiz score</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="text-zinc-900">Laboratory content & details</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {props.data.length ? (
                props.data.map((d: any) => (
                  <Table.Row key={d.id}>
                    <Table.RowHeaderCell className="text-zinc-900">{d.student.name}</Table.RowHeaderCell>
                    <Table.RowHeaderCell className="text-zinc-900">{formatDate(d.created_at)}</Table.RowHeaderCell>
                    <Table.RowHeaderCell className="text-zinc-900">{d.quiz_score}</Table.RowHeaderCell>
                    <Table.RowHeaderCell className="text-zinc-900">
                      {renderLaboratoryOutputs(d.laboratories_data, d.lecture.labs)}
                    </Table.RowHeaderCell>
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
        </div>
      </div>
    </div>
  );
};