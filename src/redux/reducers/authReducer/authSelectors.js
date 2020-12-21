import { createSelector } from 'reselect';

export const authTokenSelector = (state) => state.auth.token;
export const authRoleSelector = (state) => state.auth.role;
export const authVerifiedSelector = (state) => state.auth.verified;

export const tokenAdminFetcher = (token, role, verified) => ({
  token,
  role,
  verified,
});

export const authSelector = createSelector(
  authTokenSelector,
  authRoleSelector,
  authVerifiedSelector,
  tokenAdminFetcher
);
