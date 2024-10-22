import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button, Card } from "@radix-ui/themes";
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
      await deleteLecture(id).then(() => getLectures());
    }
  };

  const getModuleSrcUrl = (path: string) => {
    return APP_URL + path;
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
      <PageHeader title="Manage Laboratories" subtitle="View all and manage laboratories">
        <Link to="/dashboard/manage/laboratories/add">
          <Button color="blue">Add Laboratory</Button>
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {data.length ? (
          data.map((d: any) => (
            <Card key={d.id} className="w-full !py-4 !px-5 border border-gray-800 text-zinc-50 bg-zinc-950 shadow-md">
              <h1 className="font-bold">{d.title}</h1>
              <p className="text-[14px] mt-2">{d.description}</p>
              <div className="mt-3">
                <a href={getModuleSrcUrl(d.module_src)} className="text-xs text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                  Module File (Click to view)
                </a>
              </div>
              <p className="mt-2 justify-center">Has Assessment Quiz? {getQuestionsData(d.questions)}</p>
              <div className="mt-3 flex justify-center gap-2">
                <Link to={`/dashboard/manage/laboratories/${d.id}/edit`}>
                  <Button className="text-xs" color="blue" variant="soft">
                    Update
                  </Button>
                </Link>
                <Button className="text-xs" color="red" onClick={() => confirmDeleteLecture(d.id)}>
                  Delete
                </Button>
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

export default ManageLecturesPage;
