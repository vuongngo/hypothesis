/*
  * Improve fetch by throwing error with response status > 300
  *
  * @param {path} string Api path
  * @param {config} object Fetch configuration
  *
  */
export function fetchPr(path, config) {
  return fetch(path, config)
    .then(response =>
          response.json().then(json => ({ json, response }))
         )
    .then(({ json, response }) => {
      if (response.status >= 300) {
        throw json;
      }
      return json;
    })
    .catch((err) => {
      throw err;
    });
}

/*
  * Create configuration header for api call
  *
  * @param {method} string GET/POST/PATCH
  *
  */
export function jsonConfig(method) {
  const config = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    mode: 'cors'
  };
  return config;
}
