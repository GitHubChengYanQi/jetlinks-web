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

export const outboundIDSelect = {
  url: '/order/listSelect',
  method: 'POST'
};
export const orderIdSelect = {
  url: '/order/listSelect',
  method: 'POST'
};
// export const order

