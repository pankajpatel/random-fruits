export const BASE_URL =
  'https://cloudrun-frontend-recruitment-test-5hhyjiivra-ew.a.run.app';

// TODO: Extend API to handle errors and non-json responses
export const get = (endpoint: string) =>
  fetch(`${BASE_URL}${endpoint}`).then((res) => res.json());
