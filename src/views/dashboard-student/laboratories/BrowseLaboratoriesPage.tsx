import React from "react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { Flex, Card, Button, Badge } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useLecturesService } from "@/services";
import { APP_URL } from "@/constants";

const BrowseLaboratoriesPage: React.FC = () => {
  const { getLectures } = useLecturesService();

  const [data, setData] = React.useState([]);

  const fetchLectures = async () => {
    await getLectures().then((data) => setData(data));
  };

  const getModuleSrcUrl = (path: string) => {
    return APP_URL + path;
  };

  const getQuestionsData = (questions: string) => {
    if (!questions) return "No";

    const parsedQuestions = JSON.parse(questions);
    return `Yes - (${parsedQuestions.length} question(s))`;
  };

  const formatDate = (dateStr: string) => {
    return format(parseISO(dateStr), "MMMM dd, yyyy hh:mm a");
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
              <Badge>{formatDate(d.created_at)}</Badge>
              <h1 className="font-bold text-xl mt-2">{d.title}</h1>
              <p className="text-[14px] mt-2">{d.description}</p>
              <div className="mt-3">
                <a href={getModuleSrcUrl(d.module_src)} className="text-xs text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                  Module File (Click to view)
                </a>
              </div>
              <p className="mt-2 justify-center">Has Assessment Quiz? {getQuestionsData(d.questions)}</p>
              <div className="mt-3 flex justify-center gap-2">
                <Link to={`/dashboard/laboratories/${d.id}`}>
                  <Button className="text-xs" color="blue" variant="soft">
                    Take/View
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        ) : (
          <Card className="col-span-2 text-center font-bold shadow">NO DATA</Card>
        )}
      </div>
    </Flex>
  );
};

export default BrowseLaboratoriesPage;
