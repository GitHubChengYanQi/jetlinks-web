/**
 * 发货表接口配置
 *
 * @author
 * @Date 2021-07-15 17:41:40
 */

export const orderAdd = {
  url: '/order/add',
  method: 'POST',
  rowKey:'orderId'
};

export const orderEdit = {
  url: '/order/edit',
  method: 'POST',
  rowKey:'orderId'
};

export const orderDelete = {
  url: '/order/delete',
  method: 'POST',
  rowKey:'orderId'
};

export const orderDetail = {
  url: '/order/detail',
  method: 'POST',
  rowKey:'orderId'
};

export const orderList = {
  url: '/order/list',
  method: 'POST',
  rowKey:'orderId'
};

export const outboundIdSelect = {
  url: '/order/listSelect',
  method: 'POST'
};
export const clientIdSelect = {
  url: '/client/listSelect',
  method: 'POST'
};
