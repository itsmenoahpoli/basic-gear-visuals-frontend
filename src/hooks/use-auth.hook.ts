import { useAuthStore } from "@/stores";

export const useAuth = () => {
  const { authUser, authToken, CLEAR_AUTH } = useAuthStore();

  const checkAuth = () => {
    return authUser && authToken;
  };

  const logout = () => {
    CLEAR_AUTH();

    window.location.href = "/auth/signin";
  };

  return {
    userFullname: authUser?.name,
    userRole: authUser?.account_type.toUpperCase(),
    checkAuth,
    logout,
  };
};
