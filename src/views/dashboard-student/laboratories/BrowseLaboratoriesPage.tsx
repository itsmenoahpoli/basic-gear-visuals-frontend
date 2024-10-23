import React from "react";
import { Link } from "react-router-dom";
import { Flex, Card, Button, Callout } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useLecturesService } from "@/services";
import { useAuth } from "@/hooks";

const BrowseLaboratoriesPage: React.FC = () => {
  const { getLectures, getMyLaboratories } = useLecturesService();
  const { currentUserId } = useAuth();

  const [data, setData] = React.useState([]);

  const fetchLectures = async () => {
    await getLectures().then(async (data) => {
      const myLabs = await getMyLaboratories(+currentUserId!);

      console.log(myLabs);

      const dataCopy = data.filter((lecture: any) => !myLabs.some((lab: any) => lab.id === lecture.id));

      setData(dataCopy);
    });
  };

  const getQuestionsData = (questions: string) => {
    if (!questions) return "No";

    const parsedQuestions = JSON.parse(questions);
    return `Yes - (${parsedQuestions.length} question(s))`;
  };
  React.useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="Browse Laboratories" subtitle="View all available laboratories" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {data.length ? (
          data.map((d: any) => (
            <Card key={d.id} className="w-full !py-4 !px-5 border border-gray-800 text-zinc-50 bg-zinc-950 shadow-md">
              <h1 className="font-bold text-xl mt-2">{d.title}</h1>
              <p className="text-[12px] mt-2">{d.description}</p>

              <p className="text-[12px] justify-center mt-2">Has Assessment Quiz? {getQuestionsData(d.questions)}</p>
              <div className="mt-3 flex justify-end gap-2">
                <Link to={`/dashboard/laboratories/${d.id}`}>
                  <Button className="text-xs" color="blue" variant="soft">
                    Take/View
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        ) : (
          <Callout.Root color="red">
            <Callout.Text className="text-center">No laboratories available, or you may have taken all the laboratories posted</Callout.Text>
          </Callout.Root>
        )}
      </div>
    </Flex>
  );
};

export default BrowseLaboratoriesPage;
