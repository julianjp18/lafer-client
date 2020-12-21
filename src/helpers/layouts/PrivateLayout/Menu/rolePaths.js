import {
  ADMIN_USERS,
  ROOT_PATH,
} from '../../../../routing/paths';
import {
  ADMIN_ROLE,
} from '../../../../utils/roles';

export default {
  [ADMIN_ROLE]: [
    {
      title: 'dashboard',
      path: ROOT_PATH,
      icon: 'dashboard',
    },
    {
      title: 'users',
      path: ADMIN_USERS,
      icon: 'user',
    },
  ],
};
