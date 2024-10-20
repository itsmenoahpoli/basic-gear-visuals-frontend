import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Flex, Card } from "@radix-ui/themes";
import { useLectureCount } from "@/hooks/use-lecture.count.hook";

const OverviewPage: React.FC = () => {
  const { totalLectures, lectures } = useLectureCount();

  const items = lectures.map((lecture: any) => (
    <Card
      key={lecture.id}
      className="p-2 flex flex-col min-w-[300px] max-w-[400px] flex-1 flex-shrink-0 flex-grow-0 mx-auto"
    >
      <h2 className="font-bold text-xl sm:text-2xl text-center">{lecture.subject_id}</h2>
      <p className="text-m sm:text-lg text-center">Name: {lecture.name}</p>
      <p className="mt-1 text-xs sm:text-sm text-center">{lecture.description}</p>
    </Card>
  ));

  return (
    <Flex direction="column" gap="5">
      <Flex gap="5">
        <Card className="w-full !py-3 !px-7">
          <h1 className="font-bold">TOTAL SUBJECTS</h1>
          <p className="text-[32px] text-center mt-3">-</p>
        </Card>
        <Card className="w-full !py-3 !px-7">
          <h1 className="font-bold">TOTAL LABS</h1>
          <p className="text-[32px] text-center mt-3">{totalLectures}</p>
        </Card>
      </Flex>
      <Flex gap="5">
        <Card className="w-full !py-3 !px-7">
          <h1 className="font-bold">TOTAL EXAMS</h1>
          <p className="text-[32px] text-center mt-3">-</p>
        </Card>
        <Card className="w-full !py-3 !px-7">
          <h1 className="font-bold">TOTAL LECTURES</h1>
          <p className="text-[32px] text-center mt-3">-</p>
        </Card>
      </Flex>

      <Flex direction="column" className="w-full mt-5">
      <h1 className="font-bold text-lg mb-2">Lectures</h1>
      <div className="mx-auto w-full max-w-[1000px]"> 
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={{
            0: { items: 1 },
            600: { items: 1 },
            800: { items: 2 },
            1024: { items: 3 }, 
            1200: { items: 3 },
            1980: { items: 3 }, 
          }}
          controlsStrategy="responsive"
          infinite={false}
        />
      </div>
    </Flex>

      <Flex gap="5" className="!hidden">
        <Card className="w-1/2 !py-3 !px-7">
          <h1 className="font-bold">TOTAL STUDENTS</h1>
          <p className="text-[32px] text-center mt-3">-</p>
        </Card>
      </Flex>
    </Flex>
  );
};

export default OverviewPage;
