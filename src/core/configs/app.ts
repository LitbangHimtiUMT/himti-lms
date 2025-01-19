export const CONFIG_APP = {
  APP_NAME: import.meta.env.HIMTI_APP_NAME,
  BASE_URL: import.meta.env.HIMTI_BASE_URL,
};

export const API_ENDPOINT = {
  login: `${CONFIG_APP.BASE_URL}/auth/admin/login`,
  createUser: `${CONFIG_APP.BASE_URL}/auth/register`,
  check: `${CONFIG_APP.BASE_URL}/auth/token`,
  users: `${CONFIG_APP.BASE_URL}/user`,
  acara: `${CONFIG_APP.BASE_URL}/acara`,
  anggota: `${CONFIG_APP.BASE_URL}/anggota`,
  dosen: `${CONFIG_APP.BASE_URL}/dosen`,
  struktural: `${CONFIG_APP.BASE_URL}/struktural`,
  subAcara: `${CONFIG_APP.BASE_URL}/sub-acara`,
  absensi: `${CONFIG_APP.BASE_URL}/absensi`,
  angkatan: `${CONFIG_APP.BASE_URL}/angkatan`,
  userLogin: `${CONFIG_APP.BASE_URL}/user-fcm`,
  profile: `${CONFIG_APP.BASE_URL}/profile`,
  notification: `${CONFIG_APP.BASE_URL}/notification`,
  eventMeeting: `${CONFIG_APP.BASE_URL}/event-meeting`,
  meeting: `${CONFIG_APP.BASE_URL}/meeting`,
  version: `${CONFIG_APP.BASE_URL}/version`,
};
