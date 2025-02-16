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

type PayloadType = "create" | "update" | "delete";

interface ClassesCreation {
  type: PayloadType;
  data?: FormData;
  id?: string;
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
    mutationFn: async ({ data, type, id }: ClassesCreation) => {
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
        default:
          return classesService.post(data, {
            contentType: "form-data",
            headers: {
              [CONFIG_APP.HIMTI_HEADER_KEY]: btoa(CONFIG_APP.HIMTI_SECRET_KEY),
            },
          });
      }
    },
    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 2500,
        pauseOnHover: true,
        theme: "dark",
      });
      navigate("/lms/class");

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

export function useClassesById() {
  const { id } = useParams();
  return useQuery({
    queryKey: ["classesById", id],
    queryFn: () => classesService.getById({ path: id }),
    enabled: !!id,
  });
}
