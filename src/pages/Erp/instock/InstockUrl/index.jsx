/**
 * 入库表接口配置
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

export const instockAdd = {
  url: '/instock/add',
  method: 'POST',
  rowKey: 'instockId'
};

export const instockOrderAdd = {
  url: '/instockOrder/add',
  method: 'POST',
  rowKey: 'instockOrderId'
};

export const instockOrderDetail = {
  url: '/instockOrder/detail',
  method: 'POST',
  rowKey: 'instockOrderId'
};


export const instockEdit = {
  url: '/instockList/edit',
  method: 'POST',
};

export const instockDelete = {
  url: '/instock/delete',
  method: 'POST',
  rowKey: 'instockId'
};

export const instockDetail = {
  url: '/instock/detail',
  method: 'POST',
  rowKey: 'instockId'
};

export const instockList = {
  url: '/instock/list',
  method: 'POST',
  rowKey: 'instockId'
};
export const instock = {
  url: '/instockList/list',
  method: 'POST',
  rowKey: 'instockListId'
};

export const instockOrderList = {
  url: '/instockOrder/list',
  method: 'POST',
  rowKey: 'instockOrderId'
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
// 产品名称
export const ProductNameListSelect = {
  url: '/items/listSelect',
  method: 'POST',
};

export const UserIdSelect = {
  url: '/rest/mgr/Select',
  method: 'POST',
};
