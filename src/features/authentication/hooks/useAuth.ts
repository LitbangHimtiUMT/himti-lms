import { AuthLoginDTO, AuthRegisterDTO } from "@core/model/auth";
import { authService } from "@core/services/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthLoginModel } from "@core/model/auth";
import { CONFIG_APP } from "@core/configs/app";

interface ITypeAuth {
  body: AuthLoginDTO | AuthRegisterDTO;
  type: "login" | "register";
}

function isAuthLoginModel(data: AuthLoginModel): boolean {
  if (data.accessToken)
    localStorage.setItem(CONFIG_APP.TOKEN_KEY, data.accessToken);
  if (data.refreshToken)
    localStorage.setItem(CONFIG_APP.REFRESH_TOKEN_KEY, data.refreshToken);
  return (
    data !== null &&
    typeof data === "object" &&
    "accessToken" in data &&
    typeof (data as AuthLoginModel).accessToken === "string"
  );
}

export function useAuthCreation() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: ({ body, type }: ITypeAuth) => {
      switch (type) {
        case "login":
          return authService.login(body as AuthLoginDTO, {
            headers: {
              [CONFIG_APP.HIMTI_HEADER_KEY]: btoa(CONFIG_APP.HIMTI_SECRET_KEY),
            },
          });
        case "register":
          return authService.register(body as AuthRegisterDTO, {
            headers: {
              [CONFIG_APP.HIMTI_HEADER_KEY]: btoa(CONFIG_APP.HIMTI_SECRET_KEY),
            },
          });
        default:
          return authService.login(body as AuthRegisterDTO, {
            headers: {
              [CONFIG_APP.HIMTI_HEADER_KEY]: btoa(CONFIG_APP.HIMTI_SECRET_KEY),
            },
          });
      }
    },
    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
      if (res.data && isAuthLoginModel(res.data)) {
        navigate("/dashboard/enrolled-class");
      } else {
        navigate("/sign-in");
      }
    },
    onError: (err) => {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
    },
  });
  return mutation;
}

export function useCheckToken() {
  const query = useQuery({
    queryKey: ["checkToken"],
    queryFn: () => authService.check(),
  });
  return query;
}

export function useAuth() {
  const token = localStorage.getItem("token") || "";
  const { data, isLoading } = useCheckToken();

  if (!token) {
    return undefined;
  }

  if (isLoading) {
    return {
      isLoading,
    };
  }

  if (data?.code === "UNAUTHORIZED" || data?.status === 401) {
    console.log(token);
    localStorage.removeItem("token");
    return undefined;
  }
  return {
    data,
  };
}

export const useRefreshToken = (enabled = false) => {
  const token = localStorage.getItem(CONFIG_APP.REFRESH_TOKEN_KEY) ?? "";
  const query = useQuery({
    queryKey: ["refresh-token", { enabled }],
    queryFn: () =>
      authService.refreshToken(undefined, {
        bearerToken: token,
      }),
    enabled: !!token && enabled,
  });

  return query;
};
