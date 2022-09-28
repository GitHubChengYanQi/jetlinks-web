import system from './system';


export const login = {
  url: '/rest/login',
  method: 'POST',
};

export const loginByPhone = {
  url: '/rest/loginByPhone',
  method: 'POST',
};

export const addressTree = {
  url: '/commonArea/treeView',
  method: 'POST',
};

export const addressList = {
  url: '/commonArea/list',
  method: 'POST',
};

export default {
  ...system
};
