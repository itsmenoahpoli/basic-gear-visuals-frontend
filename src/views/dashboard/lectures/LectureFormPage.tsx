import React from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { TbTrashXFilled } from "react-icons/tb";
import { Flex, Card, TextField, TextArea, Select, Callout, Button } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useLecturesService } from "@/services";
import { APP_URL } from "@/constants";

type Question = {
  question: string;
  answer: string;
};

type Lab = {
  url: string;
};

const LectureFormPage: React.FC = () => {
  const { createLecture, getLecture, updateLecture } = useLecturesService();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = window.location.pathname.includes("edit");
  const buttonLabel = isEdit ? `Update Lecture` : `Save Lecture`;
  const fileInputRef = React.useRef(null);

  const [formData, setFormData] = React.useState<any>({
    subject_id: "",
    week_no: 0,
    title: "",
    description: "",
    file: null,
  });
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [labs, setLabs] = React.useState<Lab[]>([]);
  const [replaceInstruction, setReplaceInstruction] = React.useState(false);

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
      return await updateLecture(+id, {
        ...formData,
        questions: JSON.stringify(questions),
        labs: JSON.stringify(labs),
      });
    }

    return await createLecture({
      ...formData,
      questions: JSON.stringify(questions),
      labs: JSON.stringify(labs),
    }).then(() => navigate("/dashboard/manage/laboratories"));
  };

  const onFileSelect = (file: File) => {
    if (file) {
      if (file.type !== "application/pdf") {
        if (fileInputRef.current) {
          // @ts-ignore
          fileInputRef.current.value = ""; // Reset the input field
        }

        toast.error("Only PDF file is accepted");

        return;
      }

      setFormData({
        ...formData,
        file,
      });
    }
  };

  const onReplaceFileSelect = (file: File) => {
    if (file) {
      if (file.type !== "application/pdf") {
        if (fileInputRef.current) {
          // @ts-ignore
          fileInputRef.current.value = ""; // Reset the input field
        }

        toast.error("Only PDF file is accepted");

        return;
      }

      console.log(file);
    }
  };

  const onAddLab = () => {
    setLabs([
      ...labs,
      {
        url: "",
      },
    ]);
  };

  const onRemoveLab = (index: number) => {
    const labsCopy = [...labs];
    labsCopy.splice(index, 1);

    setLabs(labsCopy);
  };

  const onFillLabValue = (index: number, key: keyof Lab, value: string) => {
    const labsCopy = [...labs];
    labsCopy[index][key] = value;

    setLabs(labsCopy);
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
    questionsCopy[index][key] = value;

    setQuestions(questionsCopy);
  };

  const getModuleSrcUrl = (path: string) => {
    return APP_URL + path;
  };

  React.useEffect(() => {
    if (isEdit) {
      getLecture(+id!).then((data) => {
        populateForm(data);

        console.log(data);

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
    <Flex direction="column" gap="2" className="h-full">
      <PageHeader title="Laboratory Details" subtitle="Manage details of the laboratory" />

      <div className="px-3">
        <Card className="bg-zinc-950 mb-4">
          <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3 ">
            <Flex direction="column" gap="1">
              <small className="text-zinc-50">Laboratory Number (week #) </small>
              <Select.Root value={formData.week_no.toString()} onValueChange={(v) => setValue("week_no", v)} required>
                <Select.Trigger />
                <Select.Content color="blue">
                  <Select.Group>
                    <Select.Item value="1">1</Select.Item>
                    <Select.Item value="2">2</Select.Item>
                    <Select.Item value="3">3</Select.Item>
                    <Select.Item value="4">4</Select.Item>
                    <Select.Item value="5">5</Select.Item>
                    <Select.Item value="6">6</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction="column" gap="1">
              <small className="text-zinc-50">Laboratory Name</small>
              <TextField.Root type="text" defaultValue={formData.title} onChange={(v) => setValue("title", v.target.value)} required />
            </Flex>

            <Flex direction="column" gap="1">
              <small className="text-zinc-50">Description</small>
              <TextArea defaultValue={formData.description} rows={10} onChange={(v) => setValue("description", v.target.value)} required />
            </Flex>

            <Flex direction="column" gap="1">
              <small className="text-zinc-50">Laboratory Instructions</small>

              {isEdit ? (
                <Flex gap="2">
                  {replaceInstruction ? (
                    <TextField.Root
                      // @ts-ignore
                      type="file"
                      ref={fileInputRef}
                      defaultValue={undefined}
                      onChange={(v) => onReplaceFileSelect(v.target.files![0])}
                      required
                    />
                  ) : (
                    <a href={getModuleSrcUrl(formData.module_src)} target="_blank" className="text-blue-500 underline">
                      View laboratory instruction PDF file (new tab)
                    </a>
                  )}

                  {!replaceInstruction ? (
                    <Button size="1" color="yellow" variant="soft" type="button" onClick={() => setReplaceInstruction(true)}>
                      Update Instructions
                    </Button>
                  ) : (
                    <Button size="1" color="orange" variant="soft" type="button" onClick={() => setReplaceInstruction(false)}>
                      Cancel
                    </Button>
                  )}
                </Flex>
              ) : (
                <TextField.Root
                  // @ts-ignore
                  type="file"
                  ref={fileInputRef}
                  defaultValue={formData.file}
                  onChange={(v) => onFileSelect(v.target.files![0])}
                  required
                />
              )}
            </Flex>

            <Flex direction="column" gap="3" className="border-t-2 border-zinc-700 py-5 mt-4">
              <Flex justify="between" className="w-full">
                <h1 className="text-zinc-50">Laboratory Environment</h1>

                <Flex justify="end" gap="2">
                  <Button color="blue" variant="soft" size="1" type="button" onClick={onAddLab}>
                    Add Lab
                  </Button>
                </Flex>
              </Flex>

              {labs.length ? (
                labs.map((lab: Lab, index: number) => (
                  <Flex gap="3" key={`lab-${index}`}>
                    <Button type="button" variant="classic" color="red" onClick={() => onRemoveLab(index)}>
                      <TbTrashXFilled />
                    </Button>
                    <TextField.Root
                      color="blue"
                      type="text"
                      value={lab.url}
                      className="w-full"
                      placeholder="Enter lab url"
                      onChange={(e) => onFillLabValue(index, "url", e.target.value)}
                    />
                  </Flex>
                ))
              ) : (
                <Callout.Root color="blue" variant="soft">
                  <Callout.Text className="text-center">No labs yet</Callout.Text>
                </Callout.Root>
              )}
            </Flex>

            <Flex direction="column" gap="3" className="border-t-2 border-zinc-700 py-5 mt-4">
              <Flex justify="between" className="w-full">
                <h1 className="text-zinc-50">Short Quiz</h1>

                <Flex justify="end" gap="2">
                  <Button color="blue" variant="soft" size="1" type="button" onClick={onAddQuestion}>
                    Add Question
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
                      color="blue"
                      type="text"
                      value={question.question}
                      className="w-2/3"
                      placeholder="Enter question"
                      onChange={(e) => onFillQuestionValue(index, "question", e.target.value)}
                    />
                    <TextField.Root
                      color="blue"
                      type="text"
                      value={question.answer}
                      className="w-1/3"
                      placeholder="Enter answer"
                      onChange={(e) => onFillQuestionValue(index, "answer", e.target.value)}
                    />
                  </Flex>
                ))
              ) : (
                <Callout.Root color="blue" variant="soft">
                  <Callout.Text className="text-center">No questions yet</Callout.Text>
                </Callout.Root>
              )}
            </Flex>

            <div>
              <Button type="submit" color="green" variant="soft" className="text-xs">
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
