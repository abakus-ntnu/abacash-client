// @flow
import { normalize, Schema } from 'normalizr';
import fetchJSON from '../utils/http';
import { getToken } from '../selectors/auth';
import type { Thunk, PromisedAction } from './types';

const normalizePayload: (payload: Object, schema: Schema) => Object = (payload, schema) => {
  if (!schema) return payload;
  return normalize(payload, schema);
};

type Options = {
  type: string,
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  endpoint: string,
  body?: Object,
  files?: Array<File>,
  schema?: Schema,
  meta?: Object,
  isRequestNeeded?: () => boolean,
  headers?: Object,
  timeout?: number,
  requiresAuthentication?: boolean,
  token?: string
};

export default function callAPI({
  type,
  method = 'GET',
  endpoint,
  body,
  files,
  schema,
  meta,
  isRequestNeeded = () => true,
  headers = {},
  timeout,
  requiresAuthentication = true,
  token
}: Options): Thunk {
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
    const apiURL = getState().auth.get('apiURL');
    const apiUrl = fullUrl ? endpoint : `${apiURL}/${endpoint}`;

    const promiseAction: PromisedAction = {
      type,
      meta: {
        ...meta,
        optimisticId,
        body,
      },
      payload: fetchJSON(apiUrl, options)
        .then(({ json, text, response }) => ({
          response,
          json: json ? normalizePayload(json, schema) : json,
          text,
          originalJson: json,
        })),
    };

    return dispatch(promiseAction);
  };
}
