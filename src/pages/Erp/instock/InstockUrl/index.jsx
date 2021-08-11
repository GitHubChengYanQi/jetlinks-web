/**
 * 入库表接口配置
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

export const instockAdd = {
  url: '/instock/add',
  method: 'POST',
  rowKey:'instockId'
};

export const instockEdit = {
  url: '/instock/edit',
  method: 'POST',
  rowKey:'instockId'
};

export const instockDelete = {
  url: '/instock/delete',
  method: 'POST',
  rowKey:'instockId'
};

export const instockDetail = {
  url: '/instock/detail',
  method: 'POST',
  rowKey:'instockId'
};

export const instockList = {
  url: '/instock/list',
  method: 'POST',
  rowKey:'instockId'
};

export const itemIdSelect = {
  url: '/items/listSelect',
  method: 'POST'
};
export const brandIdSelect = {
  url: '/brand/listSelect',
  method: 'POST'
};
export const storeHouseSelect = {
  url: '/storehouse/listSelect',
  method: 'POST'
};
