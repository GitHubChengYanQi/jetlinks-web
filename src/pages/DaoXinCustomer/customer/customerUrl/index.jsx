/**
 * 客户管理表接口配置
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

export const clientAdd = {
  url: '/customer/addcusid',
  method: 'POST',
  rowKey:'customerId'
};

export const clientEdit = {
  url: '/customer/edit',
  method: 'POST',
  rowKey:'customerId'
};

export const clientDelete = {
  url: '/customer/delete',
  method: 'POST',
  rowKey:'customerId'
};

export const clientDetail = {
  url: '/customer/detail',
  method: 'POST',
  rowKey:'customerId'
};

export const clientList = {
  url: '/customer/list',
  method: 'POST',
  rowKey:'customerId'
};

export const contactsListLike = {
  url: '/contacts/list',
  method: 'POST',
};

export const clientIdSelect = {
  url: '/customer/listSelect',
  method: 'POST'
};

