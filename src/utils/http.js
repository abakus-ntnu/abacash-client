// @flow
const APPLICATION_VERSION = process.env.APPLICATION_VERSION;

export class HTTPError extends Error {
  name = 'HTTPError';
  response = null;
  json = null;
  text = null;
}

function delay(time: number) {
  return new Promise((resolve: () => void) => {
    setTimeout(resolve, time * 1000);
  });
}

function timeout(promise, time) {
  return Promise.race([
    promise,
    delay(time).then(() => {
      throw new HTTPError('Operation timed out');
    }),
  ]);
}

type Options = {
  body?: Object | string,
  method: MethodType,
  files?: Array<any>,
  headers: { [key: string]: string }
};

export default function fetchJSON(path: string, options: Options = { method: 'GET', headers: {} }): Promise<*> {
  const body = options.body;

  if (typeof body === 'object') {
    options.body = JSON.stringify(body);
  }

  if (options.method !== 'GET' && !body) {
    options.body = '';
  }

  const filesToUpload = options.files ? [...options.files] : [];
  delete options.files;

  if (filesToUpload.length) {
    const formBody = new FormData();
    const body = options.body;
    if (body && typeof body === 'object') {
      body.map((prop) => {
        if (body[prop]) {
          let payload = body[prop];
          if (typeof payload === 'object') {
            payload = JSON.stringify(payload);
          }
          return formBody.append(prop, payload);
        }
        return null;
      });
    }

    filesToUpload.map((file) => (formBody.append('file', file)));
    options.body = formBody;
    options.headers['Content-Type'] =
      options.headers['Content-Type'] ||
      'multipart/form-data; boundary=------------------abacash.form';
  } else {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
  }

  const request = new Request(path, {
    ...options,
    body: options.body,
    headers: new Headers({
      'X-ABACASH-APPLICATION-VERSION': APPLICATION_VERSION || 'unknown',
      ...options.headers,
    }),
  });

  return timeout(fetch(request)
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (contentType === null || contentType.indexOf('application/json') < 0) {
        return response.text().then(
          (text) => ({ text, response, json: null })
        );
      }
      return response.json().then(
        (json) => ({ json, response, text: null }),
      );
    })
    .then(({ json, text, response }) => {
      if (response.status === 204) {
        return Promise.resolve({ json: null, text, response });
      }

      if (response.ok && json !== undefined) {
        return { json, text: null, response };
      }

      const error = new HTTPError(`${response.status} ${response.statusText}`);
      error.status = response.status;
      error.response = response;
      error.json = json;
      error.text = text;
      throw error;
    }), filesToUpload.length ? 150 : 20
  );
}
