import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Card } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useLecturesService } from "@/services";
import { APP_URL } from "@/constants";

const TakeLaboratoryPage: React.FC = () => {
  const { getLecture } = useLecturesService();
  const { id } = useParams<{ id: string }>();

  const [data, setData] = React.useState<any>(null);

  const getModuleSrcUrl = (path: string) => {
    return APP_URL + path;
  };

  React.useEffect(() => {
    if (id) {
      getLecture(+id!).then((data) => {
        console.log(data);
        setData(data);
      });
    }
  }, []);

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="View Laboratory Details" subtitle="View laboratory detail" />

      <Card className="w-full !py-4 !px-5 border border-gray-800 text-zinc-50 bg-zinc-950 shadow-md">
        {data ? (
          <Flex direction="column" gap="2">
            <Flex direction="column" gap="2">
              <Flex direction="row" gap="2">
                <small>Laboratory #</small>
                {data.week_no}
              </Flex>
              <Flex direction="row" gap="2">
                <small>Laboratory Name</small>
                {data.title}
              </Flex>
            </Flex>

            <Flex direction="row" gap="2">
              <small>Laboratory Description</small>
              {data.description}
            </Flex>

            <Flex direction="row" gap="2">
              <small>View PDF Instructions</small>
              <a href={getModuleSrcUrl(data.module_src)} target="_blank" className="text-sm text-blue-500 underline">
                {getModuleSrcUrl(data.module_src)}
              </a>
            </Flex>

            <hr />
          </Flex>
        ) : null}
      </Card>
    </Flex>
  );
};

export default TakeLaboratoryPage;
