import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Card, Button, TextArea, TextField, Callout } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useLecturesService } from "@/services";
import { APP_URL } from "@/constants";

const TakeLaboratoryPage: React.FC = () => {
  const { getLecture } = useLecturesService();
  const { id } = useParams<{ id: string }>();

  const [data, setData] = React.useState<any>(null);
  const [questions, setQuestions] = React.useState<any>(null);
  const [labs, setLabs] = React.useState<any>(null);

  const getModuleSrcUrl = (path: string) => {
    return APP_URL + path;
  };

  React.useEffect(() => {
    if (id) {
      getLecture(+id!).then((data) => {
        console.log(data);
        setData(data);

        if (data.questions) {
          setQuestions(JSON.parse(data.questions));
        }

        if (data.labs) {
          setLabs(JSON.parse(data.labs));
        }
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

            <Flex gap="7" className="!h-full">
              <Flex direction="column" gap="3" className="!w-full border-r border-gray-700 pr-8">
                {questions.length ? (
                  questions.map((question: any, index: number) => (
                    <Flex gap="3" key={`question-${index}`} className="!w-full">
                      <Flex direction="column" gap="2" className="!w-1/3">
                        <small>Question</small>
                        <p>{question.question}</p>
                      </Flex>
                      <Flex direction="column" gap="2" className="!w-2/3">
                        <small>Your Answer</small>
                        <TextArea value={question.answer} placeholder="Enter answer" />
                      </Flex>
                    </Flex>
                  ))
                ) : (
                  <Callout.Root color="blue" variant="soft">
                    <Callout.Text className="text-center">No questions content</Callout.Text>
                  </Callout.Root>
                )}
              </Flex>

              <Flex direction="column" gap="8" className="!w-full">
                {labs.length ? (
                  labs.map((lab: any, index: number) => (
                    <Flex gap="3" key={`lab-${index}`} className="!w-full">
                      <div className="!w-1/3">
                        <p className="text-[11px]">Laboratory environment # {index + 1}</p>
                        <a href={lab.url} className="text-blue-600 underline">
                          {lab.url}
                        </a>
                      </div>

                      <Flex direction="column" gap="3" className="!w-2/3">
                        <small>Add laboratory build link (optional)</small>
                        <TextField.Root type="text" className="w-full" placeholder="Add laboratory build link (optional)" />

                        <small>Upload output screenshot (required)</small>
                        {/* @ts-ignore */}
                        <TextField.Root type="file" className="w-full" required />
                      </Flex>
                    </Flex>
                  ))
                ) : (
                  <Callout.Root color="blue" variant="soft">
                    <Callout.Text className="text-center">No labs yet</Callout.Text>
                  </Callout.Root>
                )}
              </Flex>
            </Flex>
          </Flex>
        ) : null}

        <Flex justify="center" className="mt-8">
          <Button color="green" size="3">
            Submit My Laboratory
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default TakeLaboratoryPage;
