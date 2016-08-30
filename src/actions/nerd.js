import callAPI from './callAPI';
import { NERD } from './types';

export function fetchNerd(username) {
  return callAPI({
    type: NERD.FETCH_NERD,
    endpoint: `nerd/${username}`,
  });
}

export function queryNerd(user) {
  return callAPI({
    type: NERD.QUERY_NERD,
    endpoint: `nerd?firstname=${user.firstname}&surname=${user.surname}`,
  });
}
