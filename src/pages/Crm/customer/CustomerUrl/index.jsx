/**
 * 客户管理表接口配置
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

export const customerAdd = {
  url: '/customer/addcusid',
  method: 'POST',
  rowKey:'customerId'
};

export const customerEdit = {
  url: '/customer/edit',
  method: 'POST',
  rowKey:'customerId'
};

export const customerDelete = {
  url: '/customer/delete',
  method: 'POST',
  rowKey:'customerId'
};

export const customerDetail = {
  url: '/customer/detail',
  method: 'POST',
  rowKey:'customerId'
};

export const customerList = {
  url: '/customer/list',
  method: 'POST',
  rowKey:'customerId'
};


export const customerIdSelect = {
  url: '/items/list',
  method: 'POST'
};

