import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Flex, Card, Button } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useLecturesService } from "@/services";

const TakeLaboratoryPage: React.FC = () => {
  const { getLecture } = useLecturesService();
  const { id } = useParams<{ id: string }>();

  const [data, setData] = React.useState<any>(null);

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
      <PageHeader title="Browse Laboratories" subtitle="View all available laboratories" />

      <Card className="w-full !py-4 !px-5 border border-gray-800 text-zinc-50 bg-zinc-950 shadow-md">
        <Flex direction="column" gap="2"></Flex>
      </Card>
    </Flex>
  );
};

export default TakeLaboratoryPage;
