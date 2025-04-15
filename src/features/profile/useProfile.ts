import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CONFIG_APP } from "../../core/configs/app";
import { ApiResponse } from "../../core/libs/api/types";
import { profileService } from "../../core/services/profile";
import { useRefreshToken } from "../authentication/hooks/useAuth";

export const useProfile = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const refreshToken = useRefreshToken(enabled);

  const token = localStorage.getItem(CONFIG_APP.TOKEN_KEY) ?? "";

  const query = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.get(),
    enabled: !!token,
  });

  useEffect(() => {
    const error = query.error as ApiResponse;
    if (
      query?.data?.code === "UNAUTHORIZED" ||
      error?.code === "UNAUTHORIZED"
    ) {
      setEnabled(true);
      const data = refreshToken.data?.data;
      if (data?.accessToken && data?.refreshToken) {
        localStorage.setItem(CONFIG_APP.TOKEN_KEY, data.accessToken);
        localStorage.setItem(CONFIG_APP.REFRESH_TOKEN_KEY, data.refreshToken);
      }
    }
  }, [query.data, query.error, refreshToken.data]);
  return query;
};
