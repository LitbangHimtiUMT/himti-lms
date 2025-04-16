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

interface Options extends QueryParams {
  page?: number;
  perPage?: number;
  name?: string;
  path?: string;
}

type PayloadType = "create" | "update" | "delete" | "join-invitation";

interface ClassesCreation {
  type: PayloadType;
  data?: FormData;
  id?: string;
  code?: string;
}

export function useClasses(options?: Options) {
  const [searchParams] = useSearchParams();
  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const searchQuery =
    options?.search || searchParams.get("search") || undefined;
  const search = useDebounce(searchQuery as string, 500);

  const query = useQuery({
    queryKey: ["classes", { page, perPage, search, path: options?.path }],
    queryFn: () =>
      classesService.get({
        queryParams: {
          perPage: perPage ? Number(perPage) : undefined,
          page: page ? Number(page) : undefined,
          search,
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
          return classesService.post(data, {
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
            headers: {
              [CONFIG_APP.HIMTI_HEADER_KEY]: btoa(CONFIG_APP.HIMTI_SECRET_KEY),
            },
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
        default:
          return classesService.post(data, {
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
        navigate(`/dashboard?classId=${res.data?.classId}`);
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

export function useDetailClass(by: "id" | "code" = "id") {
  const { id, code } = useParams();
  return useQuery({
    queryKey: ["classesById", { id, code }],
    queryFn: () =>
      classesService.getById({ path: by === "id" ? id : `code/${code}` }),
    enabled: !!id || !!code,
  });
}
