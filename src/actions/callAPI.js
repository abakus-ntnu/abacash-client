import { normalize } from 'normalizr';
import fetchJSON from '../utils/http';
import { API_URL } from '../env';
import { getToken } from '../selectors/auth';

const normalizePayload = (payload, schema) => {
  if (!schema) return payload;
  return normalize(payload, schema);
};

export default function callAPI({
  type,
  method = 'get',
  endpoint,
  body,
  files,
  schema,
  meta,
  isRequestNeeded = () => true,
  headers = {},
  timeout,
  json,
  requiresAuthentication = true,
  token
}) {
  return (dispatch, getState) => {
    if (isRequestNeeded && isRequestNeeded(getState()) === false) {
      return Promise.resolve();
    }

    const authToken = token || getToken(getState().auth);
    if (requiresAuthentication && authToken) {
      headers.Authorization = `Token ${authToken}`;
    }
    const options = {
      method,
      body,
      json,
      files,
      timeout,
      headers,
    };

    /**
     * Make an optimistic payload so we can act as
     * if the request succeded. The normalized payload will be available
     * on action.payload of the begin action, whereas action.meta
     * contain the original payload.
     */
    const optimisticId = Date.now() * Math.random() * 1000;
    const optimisticPayload = body ? normalizePayload({
      ...body,
      id: optimisticId,
      persisted: false,
    }, schema) : null;

    // Don't send the generated optimistic id to the server
    if (optimisticPayload && optimisticPayload.id) {
      delete optimisticPayload.id;
    }

    const fullUrl = (~endpoint.indexOf('https://') || ~endpoint.indexOf('http://'));
    const apiUrl = fullUrl ? endpoint : `${API_URL}/${endpoint}`;

    return dispatch(({
      type,
      meta: {
        ...meta,
        optimisticId,
        body,
      },
      payload: fetchJSON(apiUrl, options)
        .then(({ json, response }) => ({
          response,
          json: normalizePayload(json, schema),
          originalJson: json,
        })),
    }));
  };
}
