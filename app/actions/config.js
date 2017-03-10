import fs from 'fs';
import path from 'path';
import { promisify } from 'bluebird';
import { CONFIG } from './types';
import type { PromisedAction } from './types';

export function loadConfig() {
  return (dispatch) => {
    const homePath =
      process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE || __dirname;
    const configFile = path.join(homePath, '.abacash', 'config.json');
    const readFile = promisify(fs.readFile);

    const action: PromisedAction = {
      type: CONFIG.LOAD_CONFIG,
      payload: readFile(configFile)
        .then((data) => JSON.parse(data))
    };

    return dispatch(action);
  };
}
