import callAPI from './callAPI';
import { SYSTEM } from './types';

export function fetchSystem() {
  return (dispatch, getState) => {
    const token = getState().auth.get('token');

    return dispatch(callAPI({
      type: SYSTEM.FETCH_SYSTEM,
      endpoint: `systems/${token}?lookupParam=apiToken`,
    }));
  };
}
