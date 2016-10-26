import { Map, List } from 'immutable';
import type { Action, ActionWithoutPayload } from '../actions/types';

export type State = Map | List | Object;
export type Reducer = (initialState: State, action: Action | ActionWithoutPayload) => State;
