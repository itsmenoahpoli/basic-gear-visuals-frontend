import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Flex, Card } from "@radix-ui/themes";
import { useAuth, useLectureCount } from "@/hooks";

const OverviewPage: React.FC = () => {
  const { totalLectures, lectures } = useLectureCount();
  const { userRole } = useAuth();
  const IS_TEACHER = userRole === "TEACHER";

  const items = lectures.map((lecture: any) => (
    <Card
      key={lecture.id}
      className="p-2 flex flex-col min-w-[300px] max-w-[400px] flex-1 flex-shrink-0 flex-grow-0 mx-auto bg-zinc-950 rounded-none"
    >
      <h2 className="font-bold text-xl sm:text-2xl text-center">{lecture.subject_id}</h2>
      <p className="text-m sm:text-lg text-center">Name: {lecture.name}</p>
      <p className="mt-1 text-xs sm:text-sm text-center">{lecture.description}</p>
    </Card>
  ));

  return (
    <Flex direction="column" gap="5">
      <Flex gap="5">
        <Card className="w-full !py-3 !px-7 bg-zinc-950">
          <h1 className="font-bold text-zinc-50">TOTAL SUBJECTS</h1>
          <p className="text-[32px] text-center text-zinc-50  mt-3">-</p>
        </Card>
        <Card className="w-full !py-3 !px-7 bg-zinc-950">
          <h1 className="font-bold text-zinc-50">TOTAL LABS</h1>
          <p className="text-[32px] text-center text-zinc-50 mt-3">{totalLectures}</p>
        </Card>
      </Flex>
      <Flex gap="5">
        <Card className="w-full !py-3 !px-7 bg-zinc-950">
          <h1 className="font-bold text-zinc-50">TOTAL EXAMS</h1>
          <p className="text-[32px] text-center text-zinc-50 mt-3">-</p>
        </Card>
        <Card className="w-full !py-3 !px-7 bg-zinc-950">
          <h1 className="font-bold text-zinc-50">TOTAL LECTURES</h1>
          <p className="text-[32px] text-center text-zinc-50 mt-3">-</p>
        </Card>
      </Flex>

      {IS_TEACHER ? (
        <Flex direction="column" className="w-full mt-5">
          <h1 className="font-bold text-lg mb-2 ">Lectures</h1>
          <div className="mx-auto w-full max-w-[1000px]">
            <AliceCarousel
              renderPrevButton={() => <button className="text-zinc-950 text-5xl">‹</button>}
              renderNextButton={() => <button className="text-zinc-950 text-5xl">›</button>}
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
              disableDotsControls
              infinite
              autoPlay
              autoPlayInterval={2000}
            />
          </div>
        </Flex>
      ) : null}

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
