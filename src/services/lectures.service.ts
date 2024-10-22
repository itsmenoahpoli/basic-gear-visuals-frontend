import axios from "axios";
import { toast } from "react-toastify";
import { useHttp } from "@/hooks";
import { APP_API_URL } from "@/constants";

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
    const url = APP_API_URL;
    let formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    return await axios
      .post(url + "lectures", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Laboratory created!");
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const updateLecture = async (id: number, data: any) => {
    return await httpClient
      .patch("lectures/" + id, data)
      .then(() => {
        toast.success("Laboratory updated!");
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
    updateLecture,
    deleteLecture,
  };
};
