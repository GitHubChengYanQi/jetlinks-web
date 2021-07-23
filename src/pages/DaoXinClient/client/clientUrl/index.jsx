/**
 * 客户管理表接口配置
 *
 * @author
 * @Date 2021-07-23 10:06:12
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

export const contactsListLike = {
  url: '/contacts/list',
  method: 'POST',
};

