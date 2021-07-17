/**
 * 客户管理表接口配置
 *
 * @author
 * @Date 2021-07-16 12:55:35
 */

export const clientAdd = {
  url: '/client/add',
  method: 'POST',
  rowKey:'clientId'
};

export const clientEdit = {
  url: '/client/edit',
  method: 'POST',
  rowKey:'clientId'
};

export const clientDelete = {
  url: '/client/delete',
  method: 'POST',
  rowKey:'clientId'
};

export const clientDetail = {
  url: '/client/detail',
  method: 'POST',
  rowKey:'clientId'
};

export const clientList = {
  url: '/client/list',
  method: 'POST',
  rowKey:'clientId'
};
export const clientListSelect = {
  url: '/client/listSelect',
  method: 'POST',
  rowKey:'clientId'
};

export const orderIdSelect = {
  url: '/client/listSelect',
  method: 'POST'
};

export const addressIdSelect = {
  url: '/adress/listSelect',
  method: 'POST'
};
