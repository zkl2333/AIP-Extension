export const fetcherWithKey = ([url, key]: [string, string]) =>
  fetch(url, {
    headers: {
      'API-KEY': key
    }
  }).then(res => res.json())
