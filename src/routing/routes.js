import { lazy } from 'react';
import Root from '../components/Root';
import {
  ADMIN_ROLE,
} from '../utils/roles';
import * as Paths from './paths';

const Users = lazy(() => import('../components/Admin/Users'));

export default [
  {
    title: 'Home',
    path: Paths.ROOT_PATH,
    component: Root,
  },
  {
    title: 'Admin Users',
    path: Paths.ADMIN_USERS,
    component: Users,
    roles: [ADMIN_ROLE],
  },
];
