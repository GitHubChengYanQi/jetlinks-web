export const roleAdd = {
  url: '/rest/role/add',
  method: 'POST',
};

export const roleRemove = {
  url: '/role/remove',
  method: 'POST',
};

export const roleSave = {
  url: '/rest/role/edit',
  method: 'POST',
};

export const roleList = {
  url: '/role/pageList',
  method: 'POST',
};

export const roleView = {
  url: '/rest/role/view',
  method: 'POST',
};
export const roleTree = {
  url: '/rest/role/roleTreeList',
  method: 'POST'
};
export const roleTreeList = {
  url: '/rest/role/roleTree',
  method: 'POST'
};

export const roleListSelect = {
  url: '/role/listSelect',
  method: 'POST'
};
export const roleSet = {
  url: '/rest/role/setAuthority',
  method: 'POST'
};
export const roleSetView = {
  url: '/rest/menu/menuTreeListByRoleId',
  method: 'POST',
  rowKey: 'roleId'
};
export const roleListByUserId = {
  url: '/rest/role/roleTreeListByUserId',
  method: 'POST',
  rowKey: 'userId'
};
