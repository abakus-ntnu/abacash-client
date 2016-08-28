import { applicationVersion } from '../env';

export class HTTPError extends Error {
  name = 'HTTPError';
}

function delay(time) {
  return new Promise((resolve) => {
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

export default function fetchJSON(path, options = {}) {
  const body = options.body;

  if (typeof body === 'object') {
    options.body = JSON.stringify(body);
  }

  if (options.method !== 'get' && !body) {
    options.body = '';
  }

  delete options.json;

  const filesToUpload = options.files ? [...options.files] : [];
  delete options.files;

  options.headers = options.headers || {};

  if (filesToUpload.length) {
    const formBody = new FormData();
    body.map(prop => {
      if (body[prop]) {
        let payload = body[prop];
        if (typeof payload === 'object') {
          payload = JSON.stringify(payload);
        }
        return formBody.append(prop, payload);
      }
      return null;
    });
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
      'X-ABACASH-APPLICATION-VERSION': applicationVersion,
      ...options.headers,
    }),
  });

  return timeout(fetch(request)
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (contentType === null || contentType.indexOf('application/json') < 0) {
        return response.text().then(
          (text) => ({ text, response })
        );
      }
      return response.json().then(
        (json) => ({ json, response }),
      );
    })
    .then(({ json, text, response }) => {
      if (response.status === 204) {
        return Promise.resolve({ json: null, text, response });
      }

      if (response.ok && json !== undefined) {
        return { json, response };
      }

      const error = new HTTPError(`${response.status} ${response.statusText}`);
      error.response = response;
      error.json = json;
      error.text = text;
      throw error;
    }), filesToUpload.length ? 150 : 20
  );
}
