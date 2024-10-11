import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Card, TextField, TextArea, Select, Button } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useLecturesService, useSubjectsService } from "@/services";

const LectureFormPage: React.FC = () => {
  const { createLecture, getLecture } = useLecturesService();
  const { getSubjects } = useSubjectsService();
  const { id } = useParams<{ id: string }>();
  const buttonLabel = window.location.pathname.includes("edit") ? `Update Lecture` : `Save Lecture`;

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    file: null,
  });
  const [subjects, setSubjects] = React.useState([]);

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

    return await createLecture(formData);
  };

  React.useEffect(() => {
    if (window.location.pathname.includes("edit")) {
      getLecture(+id!).then((data) => populateForm(data));
    }

    getSubjects().then((data) => setSubjects(data));
  }, []);

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="Lecture Details" subtitle="Manage details of the lecture" />

      <div className="px-3 mt-8">
        <Card>
          <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
            <Flex direction="column" gap="1">
              <small>Subject</small>
              <Select.Root defaultValue="" onValueChange={(v) => setValue("subject_id", v)} required>
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    {subjects.map((subject: any) => (
                      <Select.Item value={subject.id}>{subject.name}</Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
            <Flex direction="column" gap="1">
              <small>Name</small>
              <TextField.Root type="text" defaultValue={formData.name} onChange={(v) => setValue("name", v.target.value)} required />
            </Flex>

            <Flex direction="column" gap="1">
              <small>Description</small>
              <TextArea defaultValue={formData.description} rows={10} onChange={(v) => setValue("description", v.target.value)} required />
            </Flex>

            <Flex direction="column" gap="1">
              <small>Name</small>
              {/* @ts-ignore */}
              <TextField.Root type="file" defaultValue={formData.title} onChange={(v) => setValue("name", v.target.value)} required />
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
