// @flow
import { Map } from 'immutable';

export const hasAuthentication: (state: Map<string, string>) => boolean = (state) => !!state.get('token');

export const getToken: (state: Map<string, string>) => ?string = (state) => state.get('token');
