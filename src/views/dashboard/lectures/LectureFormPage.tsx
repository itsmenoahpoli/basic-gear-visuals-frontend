import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Card, TextField, Select, Button } from "@radix-ui/themes";
import { PageHeader } from "@/components";
import { useLecturesService } from "@/services";

const LectureFormPage: React.FC = () => {
  const { createLecture, getLecture } = useLecturesService();
  const { id } = useParams<{ id: string }>();
  const buttonLabel = window.location.pathname.includes("edit") ? `Update Lecture` : `Save Lecture`;

  const [formData, setFormData] = React.useState({
    title: "",
    status: "draft",
  });

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
  }, []);

  return (
    <Flex direction="column" gap="3" className="h-full">
      <PageHeader title="Lecture Details" subtitle="Manage details of the lecture" />

      <div className="px-3 mt-8">
        <Card>
          <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
            <Flex direction="column" gap="1">
              <small>Name</small>
              <TextField.Root type="text" defaultValue={formData.title} onChange={(v) => setValue("title", v.target.value)} required />
            </Flex>

            <Flex direction="column" gap="1">
              <small>Status</small>
              <Select.Root defaultValue={formData.status} onValueChange={(v) => setValue("status", v)}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value="published">Published</Select.Item>
                    <Select.Item value="draft">Draft</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
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
