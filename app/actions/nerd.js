// @flow
import callAPI from './callAPI';
import { NERD } from './types';
import type { Dispatch } from './types';

export function fetchNerd(username: string): Dispatch {
  return callAPI({
    type: NERD.FETCH_NERD,
    endpoint: `nerd/${username}`,
  });
}

export function queryNerd(user: { firstname: string, surname: string}): Dispatch {
  return callAPI({
    type: NERD.QUERY_NERD,
    endpoint: `nerd?firstname=${user.firstname}&surname=${user.surname}`,
  });
}
