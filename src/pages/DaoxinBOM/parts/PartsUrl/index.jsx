/**
 * 清单接口配置
 *
 * @author
 * @Date 2021-07-14 14:30:20
 */

export const partsAdd = {
  url: '/parts/add',
  method: 'POST',
  rowKey:'partsId'
};

export const partsEdit = {
  url: '/parts/edit',
  method: 'POST',
  rowKey:'partsId'
};

export const partsDelete = {
  url: '/parts/delete',
  method: 'POST',
  rowKey:'partsId'
};

export const partsDetail = {
  url: '/parts/detail',
  method: 'POST',
  rowKey:'partsId'
};

export const partsList = {
  url: '/parts/list',
  method: 'POST',
  rowKey:'partsId'
};
export const partsListSelect = {
  url: '/parts/listSelect',
  method: 'POST',
  rowKey:'partsId'
};

export const itemIdSelect = {
  url: '/items/listSelect',
  method: 'POST'
};
export const brandIdSelect = {
  url: '/brand/listSelect',
  method: 'POST'
};
export const materialListSelect = {
  url: '/material/listSelect',
  method: 'POST',
  rowKey:'materialId'
};
