export const CONFIG_APP = {
  APP_NAME: import.meta.env.HIMTI_APP_NAME,
  BASE_URL: import.meta.env.HIMTI_BASE_URL,
  HIMTI_SECRET_KEY: import.meta.env.HIMTI_SECRET_KEY ?? "",
  HIMTI_HEADER_KEY: import.meta.env.HIMTI_HEADER_KEY ?? "",
  TOKEN_KEY: btoa(`token${import.meta.env.HIMTI_SECRET_KEY ?? ""}`),
  REFRESH_TOKEN_KEY: btoa(`refresh${import.meta.env.HIMTI_SECRET_KEY ?? ""}`),
};

export const API_ENDPOINT = {
  auth: {
    refreshToken: `${CONFIG_APP.BASE_URL}/auth/refresh-token`,
    login: `${CONFIG_APP.BASE_URL}/auth/login?authType=lms`,
    register: `${CONFIG_APP.BASE_URL}/auth/register?authType=lms`,
  },
  check: `${CONFIG_APP.BASE_URL}/check`,
  categories: `${CONFIG_APP.BASE_URL}/lms/categories`,
  assignment: `${CONFIG_APP.BASE_URL}/lms/assignments`,
  submissions: `${CONFIG_APP.BASE_URL}/lms/assignments/submissions`,
  mentors: `${CONFIG_APP.BASE_URL}/lms/mentors`,
  modules: `${CONFIG_APP.BASE_URL}/lms/modules`,
  sessions: `${CONFIG_APP.BASE_URL}/lms/sessions`,
  classes: `${CONFIG_APP.BASE_URL}/lms/class`,
  certificates: `${CONFIG_APP.BASE_URL}/lms/certificates`,
  profile: `${CONFIG_APP.BASE_URL}/profile`,
  completedModules: `${CONFIG_APP.BASE_URL}/lms/completed-modules`,
  participant: `${CONFIG_APP.BASE_URL}/lms/class-participants`,
};
