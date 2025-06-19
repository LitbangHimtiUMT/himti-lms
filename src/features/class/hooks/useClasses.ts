import { CONFIG_APP } from "@core/configs/app";
import {
  ApiErrorResponse,
  ApiResponse,
  QueryParams,
} from "@core/libs/api/types";
import { classesService } from "@core/services/classes";
import useDebounce from "@features/_global/hooks/useDebounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { InviteMentorDTO } from "../../../core/model/classes";

interface Options extends QueryParams {
  page?: number;
  perPage?: number;
  name?: string;
  path?: string;
}

type PayloadType =
  | "create"
  | "update"
  | "delete"
  | "join-invitation"
  | "publish"
  | "invite-mentor";

interface ClassesCreation {
  type: PayloadType;
  data?: FormData | InviteMentorDTO;
  id?: string;
  code?: string;
}

export function useClasses(options?: Options) {
  const [searchParams] = useSearchParams();
  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const categoryId = searchParams.get("categoryId")
  const searchQuery =
    options?.search || searchParams.get("search") || undefined;
  const search = useDebounce(searchQuery as string, 500);
  const token = localStorage.getItem(CONFIG_APP.TOKEN_KEY) || "";

  const query = useQuery({
    queryKey: [
      "classes",
      { page, perPage, search, path: options?.path, token, categoryId },
    ],
    queryFn: () =>
      classesService.get({
        queryParams: {
          perPage: perPage ? Number(perPage) : undefined,
          page: page ? Number(page) : undefined,
          search,
          ...categoryId && { categoryId }
        },
        path: options?.path,
      }),
  });
  return query;
}

export function useClassesCreation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ data, type, id, code }: ClassesCreation) => {
      switch (type) {
        case "create":
          return classesService.post(data as FormData, {
            contentType: "form-data",
            headers: {
              [CONFIG_APP.HIMTI_HEADER_KEY]: btoa(CONFIG_APP.HIMTI_SECRET_KEY),
            },
          });
        case "update":
          return classesService.put(data, {
            contentType: "form-data",
            path: id,
            headers: {
              [CONFIG_APP.HIMTI_HEADER_KEY]: btoa(CONFIG_APP.HIMTI_SECRET_KEY),
            },
          });
        case "delete":
          return classesService.delete({
            path: id,
          });
        case "join-invitation":
          return classesService.joinInvitation(
            {
              code: code ?? "",
            },
            {
              path: "join/invitation",
            }
          );
        case "publish":
          return classesService.publish(undefined, {
            path: `publish/${id}`,
          });
        case "invite-mentor":
          return classesService.inviteMentor(
            data as unknown as InviteMentorDTO
          );
        default:
          return classesService.post(data as FormData, {
            contentType: "form-data",
            headers: {
              [CONFIG_APP.HIMTI_HEADER_KEY]: btoa(CONFIG_APP.HIMTI_SECRET_KEY),
            },
          });
      }
    },
    onSuccess: (res, vars) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 2500,
        pauseOnHover: true,
        theme: "dark",
      });

      if (vars.type === "join-invitation") {
        navigate(`/dashboard/enrolled-class`);
      }
      if (vars.type === "create") {
        navigate(`/dashboard/my-class`);
      }
      if (vars.type === "invite-mentor") {
        queryClient.invalidateQueries({
          queryKey: ["mentor-list"],
        });
        queryClient.invalidateQueries({
          queryKey: ["class-mentors"],
        });
      }

      if(vars.type === 'delete') {
        navigate(`/dashboard/my-class`);
      }

      queryClient.removeQueries({ queryKey: ["classes"] });
      queryClient.removeQueries({ queryKey: ["classesById"] });
      return;
    },
    onError: (err: ApiErrorResponse<ApiResponse>) => {
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

export function useDetailClass(by: "id" | "code" = "id", cId?: string) {
  const { id, classId, code } = useParams();
  return useQuery({
    queryKey: ["classesById", { cId, id, code, classId }],
    queryFn: () =>
      classesService.getById({
        path: by === "id" ? cId || classId || id : `code/${code}`,
      }),
    enabled: !!cId || !!id || !!classId || !!code,
  });
}
