/**
 * 发货表接口配置
 *
 * @author
 * @Date 2021-08-20 13:14:51
 */

export const deliveryAdd = {
  url: '/delivery/add',
  method: 'POST',
  rowKey:'deliveryId'
};

export const deliveryEdit = {
  url: '/delivery/edit',
  method: 'POST',
  rowKey:'deliveryId'
};

export const deliveryDelete = {
  url: '/delivery/delete',
  method: 'POST',
  rowKey:'deliveryId'
};

export const deliveryDetail = {
  url: '/delivery/detail',
  method: 'POST',
  rowKey:'deliveryId'
};

export const deliveryList = {
  url: '/delivery/list',
  method: 'POST',
  rowKey:'deliveryId'
};

export const outstockOrderIdSelect = {
  url: '/outstockOrder/listSelect',
  method:'POST'
};
