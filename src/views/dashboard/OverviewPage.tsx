import React from "react";
import { Flex, Card } from "@radix-ui/themes";

const OverviewPage: React.FC = () => {
  return (
    <Flex direction="column" gap="5">
      <Flex gap="5">
        <Card className="w-full !py-3 !px-7">
          <h1 className="font-bold">TOTAL SUBJECTS</h1>
          <p className="text-[32px] text-center mt-3">32</p>
        </Card>
        <Card className="w-full !py-3 !px-7">
          <h1 className="font-bold">TOTAL LECTURES</h1>
          <p className="text-[32px] text-center mt-3">32</p>
        </Card>
      </Flex>
      <Flex gap="5">
        <Card className="w-full !py-3 !px-7">
          <h1 className="font-bold">TOTAL EXAMS</h1>
          <p className="text-[32px] text-center mt-3">32</p>
        </Card>
        <Card className="w-full !py-3 !px-7">
          <h1 className="font-bold">TOTAL LABORATORIES</h1>
          <p className="text-[32px] text-center mt-3">32</p>
        </Card>
      </Flex>
      <Flex gap="5">
        <Card className="w-1/2 !py-3 !px-7">
          <h1 className="font-bold">TOTAL STUDENTS</h1>
          <p className="text-[32px] text-center mt-3">32</p>
        </Card>
      </Flex>
    </Flex>
  );
};

export default OverviewPage;
