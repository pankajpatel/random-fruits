export const BASE_URL =
  "https://cloudrun-frontend-recruitment-test-5hhyjiivra-ew.a.run.app";

export const get = (endpoint: string) => fetch(`${BASE_URL}${endpoint}`).then(res => res.json());