export const CONFIG_APP = {
  APP_NAME: import.meta.env.HIMTI_APP_NAME,
  BASE_URL: import.meta.env.HIMTI_BASE_URL,
  // Plain key names for localStorage. Never derive these from a secret: Vite
  // inlines every referenced HIMTI_* env var into the public JS bundle.
  TOKEN_KEY: "himti_access_token",
  REFRESH_TOKEN_KEY: "himti_refresh_token",
};

export const API_ENDPOINT = {
  auth: {
    refreshToken: `${CONFIG_APP.BASE_URL}/auth/refresh-token`,
    login: `${CONFIG_APP.BASE_URL}/auth/login?authType=lms`,
    register: `${CONFIG_APP.BASE_URL}/auth/register?authType=lms`,
  },
  check: `${CONFIG_APP.BASE_URL}/auth/token`,
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
  courseEvaluate: `${CONFIG_APP.BASE_URL}/lms/course/evaluate`,
};
