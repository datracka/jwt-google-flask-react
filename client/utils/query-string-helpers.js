function toObject(params) {
  if (Object.entries(params).length === 0) return params;
  const search = params.substring(1);
  if (!search) return {};
  return JSON.parse(
    `{"${decodeURIComponent(search)
      .replace(/"/g, '\\"') // eslint-disable-line quotes
      .replace(/&/g, '","') // eslint-disable-line quotes
      .replace(/=/g, '":"')}"}`, // eslint-disable-line quotes
  );
}

function toQueryString(paramsObject) {
  return Object.keys(paramsObject)
    .map(
      key =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          paramsObject[key],
        )}`,
    )
    .join("&");
}

export { toQueryString, toObject };
