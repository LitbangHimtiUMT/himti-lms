// The API base URL is required by every endpoint below. Fail fast with a
// clear message when it is missing or malformed, instead of silently
// building "undefined/auth/login" URLs that fail one request at a time.
function resolveBaseUrl(): string {
  const raw = import.meta.env.HIMTI_BASE_URL;
  if (!raw) {
    throw new Error("HIMTI_BASE_URL is not set. See .env.example.");
  }
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("HIMTI_BASE_URL is not a valid absolute URL.");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("HIMTI_BASE_URL must use http or https.");
  }
  return url.toString().replace(/\/+$/, "");
}

export const CONFIG_APP = {
  APP_NAME: import.meta.env.HIMTI_APP_NAME,
  BASE_URL: resolveBaseUrl(),
};

export const API_ENDPOINT = {
  auth: {
    refreshToken: `${CONFIG_APP.BASE_URL}/auth/refresh-token`,
    login: `${CONFIG_APP.BASE_URL}/auth/login?authType=lms`,
    register: `${CONFIG_APP.BASE_URL}/auth/register?authType=lms`,
    logout: `${CONFIG_APP.BASE_URL}/auth/logout`,
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
  dashboardStats: `${CONFIG_APP.BASE_URL}/lms/dashboard/stats`,
};
