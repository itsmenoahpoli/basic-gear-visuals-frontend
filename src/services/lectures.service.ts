import { toast } from "react-toastify";
import { useHttp } from "@/hooks";

export const useLecturesService = () => {
  const { httpClient, handleApiError } = useHttp();

  const getLectures = async () => {
    return await httpClient
      .get("lectures")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const getLecture = async (id: number) => {
    return await httpClient
      .get("lectures/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const createLecture = async (data: any) => {
    return await httpClient
      .post("lectures", data)
      .then(() => {
        toast.success("Lecture created!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const deleteLecture = async (id: number) => {
    return await httpClient
      .delete("lectures/" + id)
      .then(() => {
        toast.info("Lecture deleted!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  return {
    getLectures,
    getLecture,
    createLecture,
    deleteLecture,
  };
};
