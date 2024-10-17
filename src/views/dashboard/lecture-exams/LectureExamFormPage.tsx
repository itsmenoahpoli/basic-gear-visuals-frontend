import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TbTrashXFilled } from "react-icons/tb";
import { Flex, Card, TextField, Callout, Button, Select } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useLectureExamsService, useLecturesService } from "@/services";

type Question = {
  question: string;
  choices?: {
    c1: {
      q: string;
      a: string;
    };
    c2: {
      q: string;
      a: string;
    };
    c3: {
      q: string;
      a: string;
    };
  };
  answer: string;
};

const LectureFormPage: React.FC = () => {
  const { createLectureExam, getLectureExam, updateLectureExam } = useLectureExamsService();
  const { getLectures } = useLecturesService();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = window.location.pathname.includes("edit");
  const buttonLabel = isEdit ? `Update Lecture` : `Save Lecture`;

  const [formData, setFormData] = React.useState<any>({
    lecture_id: "",
    name: "",
  });
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [lectures, setLectures] = React.useState<any>([]);

  const populateForm = (data: any) => {
    setFormData(data);
  };

  const setValue = (key: string, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && id) {
      return await updateLectureExam(+id, formData);
    }

    return await createLectureExam({ ...formData, questions: JSON.stringify(questions) }).then(() => navigate("/dashboard/manage/lectures"));
  };

  const onAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const onRemoveQuestion = (index: number) => {
    const questionsCopy = [...questions];
    questionsCopy.splice(index, 1);

    setQuestions(questionsCopy);
  };

  const onFillQuestionValue = (index: number, key: keyof Question, value: string) => {
    const questionsCopy = [...questions];
    // @ts-ignore
    questionsCopy[index][key] = value;

    setQuestions(questionsCopy);
  };

  React.useEffect(() => {
    if (isEdit) {
      getLectureExam(+id!).then((data) => populateForm(data));
    }

    getLectures().then((data) => setLectures(data));
  }, []);

  React.useEffect(() => {
    onAddQuestion();
  }, []);

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="Lecture Exam Details" subtitle="Manage details of the lecture exam" />

      <div className="px-3 mt-8">
        <Card>
          <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
            <Flex direction="column" gap="1">
              <small>Lecture</small>
              <Select.Root defaultValue={formData.lecture_id.toString()} onValueChange={(v) => setValue("lecture_id", v)} required>
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    {lectures.map((lecture: any) => (
                      <Select.Item value={lecture.id.toString()} key={lecture.title}>
                        {lecture.title}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction="column" gap="1">
              <small>Title</small>
              <TextField.Root type="text" defaultValue={formData.name} onChange={(v) => setValue("name", v.target.value)} required />
            </Flex>

            <Flex direction="column" gap="3" className="border-t-2 border-gray-700 py-5 mt-4">
              <Flex justify="between" className="w-full">
                <h1>Exam Questions</h1>

                <Flex justify="end" gap="2">
                  <Button variant="outline" size="1" type="button" onClick={onAddQuestion}>
                    Add Question (Enumeration)
                  </Button>
                  <Button variant="outline" size="1" type="button" onClick={onAddQuestion}>
                    Add Question (Multiple Choices)
                  </Button>
                </Flex>
              </Flex>

              {questions.length ? (
                questions.map((question: Question, index: number) => (
                  <Flex gap="3" key={`question-${index}`}>
                    <Button type="button" variant="classic" color="red" onClick={() => onRemoveQuestion(index)}>
                      <TbTrashXFilled />
                    </Button>
                    <TextField.Root
                      type="text"
                      value={question.question}
                      className="w-2/3"
                      placeholder="Enter question"
                      onChange={(e) => onFillQuestionValue(index, "question", e.target.value)}
                    />
                    <Flex gap="3"></Flex>
                    <TextField.Root
                      type="text"
                      value={question.answer}
                      className="w-1/3"
                      placeholder="Enter answer"
                      onChange={(e) => onFillQuestionValue(index, "answer", e.target.value)}
                    />
                  </Flex>
                ))
              ) : (
                <Callout.Root>
                  <Callout.Text className="text-center">No questions yet</Callout.Text>
                </Callout.Root>
              )}
            </Flex>

            <div>
              <Button type="submit" color="green" className="text-xs">
                {buttonLabel}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Flex>
  );
};

export default LectureFormPage;
