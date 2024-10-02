import { httpClient } from "@/api";
import { useAuthStore } from "@/stores";
import type { Credentials } from "@/types/auth";

export const useAuthService = () => {
  const { SET_USER, SET_TOKEN } = useAuthStore();

  const authenticateCredentials = async (credentials: Credentials, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    return await httpClient
      .post("auth/login", credentials)
      .then((response) => {
        const { user, token } = response.data;
        SET_USER(user);
        SET_TOKEN(token);

        setTimeout(() => {
          window.location.href = "/dashboard/";
        }, 1500);
      })
      .catch((error) => {
        setLoading(false);
        return error;
      });
  };

  return {
    authenticateCredentials,
  };
};
