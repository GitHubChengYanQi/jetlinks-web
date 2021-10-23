/**
 * 产品订单接口配置
 *
 * @author song
 * @Date 2021-10-20 16:18:02
 */

export const productOrderAdd = {
  url: '/productOrder/add',
  method: 'POST',
  rowKey:'productOrderId'
};

export const productOrderEdit = {
  url: '/productOrder/edit',
  method: 'POST',
  rowKey:'productOrderId'
};

export const productOrderDelete = {
  url: '/productOrder/delete',
  method: 'POST',
  rowKey:'productOrderId'
};

export const productOrderDetail = {
  url: '/productOrder/detail',
  method: 'POST',
  rowKey:'productOrderId'
};

export const productOrderList = {
  url: '/productOrder/list',
  method: 'POST',
  rowKey:'productOrderId'
};

export const customerListSelect = {
  url: '/customer/listSelect',
  method: 'POST',
};

export const spuListSelect = {
  url: '/spu/listSelect',
  method: 'POST',
};

