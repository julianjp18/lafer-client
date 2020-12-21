import {
  ADMIN_BRANDS,
  ADMIN_PARAMETERS,
  ADMIN_SNAS,
  ADMIN_USERS,
  CAMPAIGNS_PATH,
  ROOT_PATH,
} from '../../../../routing/paths';
import {
  ACCOUNT_ROLE,
  ADMIN_ROLE,
  ADVISOR_ROLE,
  COUNTRY_MANAGER_ROLE,
  INFLUENCER_ROLE,
  MANAGER_ROLE,
} from '../../../../utils/roles';

export default {
  [ADMIN_ROLE]: [
    {
      title: 'dashboard',
      path: ROOT_PATH,
      icon: 'dashboard',
    },
    {
      title: 'campaigns',
      path: CAMPAIGNS_PATH,
      icon: 'story',
    },
    {
      title: 'accounts',
      path: ADMIN_SNAS,
      icon: 'crown',
    },
    {
      title: 'brands',
      path: ADMIN_BRANDS,
      icon: 'squares',
    },
    {
      title: 'users',
      path: ADMIN_USERS,
      icon: 'user',
    },
    {
      title: 'parameters',
      path: ADMIN_PARAMETERS,
      icon: 'post',
    },
  ],
  [COUNTRY_MANAGER_ROLE]: [
    {
      title: 'dashboard',
      path: ROOT_PATH,
      icon: 'dashboard',
    },
    {
      title: 'campaigns',
      path: CAMPAIGNS_PATH,
      icon: 'story',
    },
    {
      title: 'accounts',
      path: ADMIN_SNAS,
      icon: 'crown',
    },
    {
      title: 'brands',
      path: ADMIN_BRANDS,
      icon: 'squares',
    },
    {
      title: 'users',
      path: ADMIN_USERS,
      icon: 'user',
    },
  ],
  [MANAGER_ROLE]: [
    {
      title: 'dashboard',
      path: ROOT_PATH,
      icon: 'squares',
    },
  ],
  [INFLUENCER_ROLE]: [
    {
      title: 'home',
      path: ROOT_PATH,
      icon: 'squares',
    },
  ],
  [ACCOUNT_ROLE]: [
    {
      title: 'dashboard',
      path: ROOT_PATH,
      icon: 'dashboard',
    },
    {
      title: 'accounts',
      path: ADMIN_SNAS,
      icon: 'crown',
    },
    {
      title: 'brands',
      path: ADMIN_BRANDS,
      icon: 'squares',
    },
    {
      title: 'campaigns',
      path: CAMPAIGNS_PATH,
      icon: 'story',
    },
  ],
  [ADVISOR_ROLE]: [
    {
      title: 'dashboard',
      path: ROOT_PATH,
      icon: 'dashboard',
    },
    {
      title: 'accounts',
      path: ADMIN_SNAS,
      icon: 'crown',
    },
    {
      title: 'campaigns',
      path: CAMPAIGNS_PATH,
      icon: 'story',
    },
    {
      title: 'brands',
      path: ADMIN_BRANDS,
      icon: 'squares',
    },
    {
      title: 'users',
      path: ADMIN_USERS,
      icon: 'user',
    },
  ],
};
