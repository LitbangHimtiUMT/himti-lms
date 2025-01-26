export const CONFIG_APP = {
  APP_NAME: import.meta.env.HIMTI_APP_NAME,
  BASE_URL: import.meta.env.HIMTI_BASE_URL,
};

export const API_ENDPOINT = {
  login: `${CONFIG_APP.BASE_URL}/auth/admin/login`,
  check: `${CONFIG_APP.BASE_URL}/check`,
  categories: `${CONFIG_APP.BASE_URL}/lms/categories`,
};
