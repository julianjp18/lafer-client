import { createSelector } from 'reselect';

export const authTokenSelector = (state) => state.auth.token;
export const authRoleSelector = (state) => state.auth.role;

export const tokenAdminFetcher = (token, role) => ({
  token,
  role,
});

export const authSelector = createSelector(
  authTokenSelector,
  authRoleSelector,
  tokenAdminFetcher
);
