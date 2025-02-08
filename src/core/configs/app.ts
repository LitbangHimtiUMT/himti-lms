export const CONFIG_APP = {
  APP_NAME: import.meta.env.HIMTI_APP_NAME,
  BASE_URL: import.meta.env.HIMTI_BASE_URL,
  HIMTI_SECRET_KEY: import.meta.env.HIMTI_SECRET_KEY ?? "",
  HIMTI_HEADER_KEY: import.meta.env.HIMTI_HEADER_KEY ?? "",
};

export const API_ENDPOINT = {
  login: `${CONFIG_APP.BASE_URL}/auth/login?authType=lms`,
  register: `${CONFIG_APP.BASE_URL}/auth/register?authType=lms`,
  check: `${CONFIG_APP.BASE_URL}/check`,
  categories: `${CONFIG_APP.BASE_URL}/lms/categories`,
  mentors: `${CONFIG_APP.BASE_URL}/lms/mentors`,
  classes: `${CONFIG_APP.BASE_URL}/lms/class`,
};
