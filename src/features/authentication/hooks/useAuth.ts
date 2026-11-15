import { AuthLoginDTO, AuthRegisterDTO } from "@core/model/auth";
import { authService } from "@core/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SESSION_QUERY_KEY } from "./useSession";
import { getErrorMessage } from "../../_global/helper/get-error-message";

interface ITypeAuth {
  body: AuthLoginDTO | AuthRegisterDTO;
  type: "login" | "register";
}

export function useAuthCreation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ body, type }: ITypeAuth) => {
      switch (type) {
        case "login":
          return authService.login(body as AuthLoginDTO);
        case "register":
          return authService.register(body as AuthRegisterDTO);
        default:
          return authService.login(body as AuthRegisterDTO);
      }
    },
    onSuccess: (res) => {
      toast.success(res?.message || "Berhasil.", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
      // Drop any cached probe result (e.g. a guest 401 from before
      // login) so the guards re-probe with the fresh session cookie
      // instead of redirecting on the stale error.
      queryClient.removeQueries({ queryKey: SESSION_QUERY_KEY });
      // Login returns data, register (201) does not. The tokens in
      // the login body are never read: auth travels in httpOnly
      // cookies set by the server.
      if (res.data) {
        navigate("/dashboard/enrolled-class");
      } else {
        navigate("/sign-in");
      }
    },
    onError: (err) => {
      toast.error(getErrorMessage(err), {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
    },
  });
  return mutation;
}
