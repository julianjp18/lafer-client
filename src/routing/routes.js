import { lazy } from 'react';
import Root from '../components/Root';
import {
  ADMIN_ROLE,
} from '../utils/roles';
import * as Paths from './paths';


const LogIn = lazy(() => import('../components/Auth/LogIn'));
const SignUp = lazy(() => import('../components/Auth/SignUp'));

export default [
  {
    title: 'Home',
    path: Paths.ROOT_PATH,
    component: Root,
  },
  {
    title: 'Log in',
    path: Paths.LOG_IN,
    component: LogIn,
  },
  {
    title: 'Sign Up',
    path: Paths.SIGN_UP,
    component: SignUp,
  },
  /*
  {
    title: 'Admin Users',
    path: Paths.ADMIN_USERS,
    component: Users,
    roles: [ADMIN_ROLE],
  },
  */
];
