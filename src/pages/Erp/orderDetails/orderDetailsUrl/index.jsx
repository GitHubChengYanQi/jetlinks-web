/**
 * 订单明细表接口配置
 *
 * @author siqiang
 * @Date 2021-08-18 13:26:29
 */

export const orderDetailsAdd = {
  url: '/orderDetails/add',
  method: 'POST',
  rowKey:'id'
};

export const orderDetailsEdit = {
  url: '/orderDetails/edit',
  method: 'POST',
  rowKey:'id'
};

export const orderDetailsDelete = {
  url: '/orderDetails/delete',
  method: 'POST',
  rowKey:'id'
};

export const orderDetailsDetail = {
  url: '/orderDetails/detail',
  method: 'POST',
  rowKey:'id'
};

export const orderDetailsList = {
  url: '/orderDetails/list',
  method: 'POST',
  rowKey:'id'
};

// 产品名称
export const ProductNameListSelect = {
  url: '/items/listSelect',
  method: 'POST',
};

