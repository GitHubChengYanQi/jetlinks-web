import system from './system';


export const login = {
  url: '/rest/login',
  method: 'POST',
};

export const addressTree = {
  url: '/commonArea/treeView',
  method: 'POST',
};

export default {
  ...system
};
