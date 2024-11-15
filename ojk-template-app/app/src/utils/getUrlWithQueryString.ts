const updateQueryString = <T>(url: string, queryParams: T): string => {
  for (let key in queryParams) {
    if (queryParams[key as keyof T]) {
      url += `${key}=${queryParams[key as keyof T]}&`;
    }
  }
  return url;
};

const checkAndRemoveLastSymbolFromQueryString = (url: string): string => {
  if (url[url.length - 1] === "&" || url[url.length - 1] === "?")
    url = url.slice(0, url.length - 1);
  return url;
};

export const getUrlWithQueryString = <T>(url: string, queryParams: T): string => {
  let resultUrl = updateQueryString(url, queryParams);
  resultUrl = checkAndRemoveLastSymbolFromQueryString(resultUrl);
  return resultUrl;
};
