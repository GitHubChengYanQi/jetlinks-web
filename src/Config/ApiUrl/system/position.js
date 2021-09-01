export const positionAdd = {
  url: '/position/addItem',
  method: 'POST',
};
export const positionDel = {
  url: '/position/delete',
  method: 'POST',
  rowKey:'positionId'
};
export const positionSave = {
  url: '/position/editItem',
  method: 'POST',
};
export const positionView = {
  url: '/position/detail',
  method: 'POST',
};
export const positionList = {
  url: '/rest/position/list',
  method: 'GET',
};
export const positionAllList = {
  url: '/rest/position/listPositions',
  method: 'GET',
};
