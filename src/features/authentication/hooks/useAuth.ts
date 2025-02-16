import { AuthLoginDTO } from "@core/model/auth";
import { authService } from "@core/services/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthLoginModel } from "@core/model/auth";
import { CONFIG_APP } from "@core/configs/app";

interface ITypeAuth {
  body: AuthLoginDTO;
  type: "login" | "register";
}

function isAuthLoginModel(data: unknown): data is AuthLoginModel {
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
          return authService.login(body, {
            headers: {
              [CONFIG_APP.HIMTI_HEADER_KEY]: btoa(CONFIG_APP.HIMTI_SECRET_KEY),
            },
          });
        case "register":
          return authService.register(body, {
            headers: {
              [CONFIG_APP.HIMTI_HEADER_KEY]: btoa(CONFIG_APP.HIMTI_SECRET_KEY),
            },
          });
        default:
          return authService.login(body, {
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
        localStorage.setItem(CONFIG_APP.TOKEN_KEY, res.data.accessToken as string);
        navigate("/dashboard");
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
