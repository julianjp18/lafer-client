import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import {
  ADMIN_ROLE,

} from '../utils/roles';
import { ROOT_PATH } from './paths';

export const userIsAdmin = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: ROOT_PATH,
  allowRedirectBack: false,
  // If selector is true, wrapper will not redirect
  authenticatedSelector: (state) => state.auth.role === ADMIN_ROLE,
  // A nice display name for this check
  wrapperDisplayName: 'isAdmin',
});
