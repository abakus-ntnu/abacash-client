export const hasAuthentication = (state) => !!state.get('token');

export const getToken = (state) => state.get('token');
