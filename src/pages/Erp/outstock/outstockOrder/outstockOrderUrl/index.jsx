/**
 * 出库单接口配置
 *
 * @author cheng
 * @Date 2021-08-16 10:51:46
 */

export const outstockOrderAdd = {
  url: '/outstockOrder/add',
  method: 'POST',
  rowKey:'outstockOrderId'
};

export const outstockOrderEdit = {
  url: '/outstockOrder/edit',
  method: 'POST',
  rowKey:'outstockOrderId'
};

export const outstockOrderDelete = {
  url: '/outstockOrder/delete',
  method: 'POST',
  rowKey:'outstockOrderId'
};

export const outstockOrderDetail = {
  url: '/outstockOrder/detail',
  method: 'POST',
  rowKey:'outstockOrderId'
};

export const outstockOrderList = {
  url: '/outstockOrder/list',
  method: 'POST',
  rowKey:'outstockOrderId'
};

export const outstockList = {
  url: '/outstock/list',
  method: 'POST',
  rowKey:'outstockId'
};

export const outstock = {
  url: '/outstockOrder/outStock',
  method: 'POST',
  rowKey:'outstockId'
};
