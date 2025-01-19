export const convertQueryParamsToObject = (
  queryParams: string
): Record<string, string> => {
  const query = new URLSearchParams(queryParams);
  const object: Record<string, string> = {};
  for (const [key, value] of query) {
      object[key] = value;
  }
  return object;
}