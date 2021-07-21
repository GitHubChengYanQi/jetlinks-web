/**
 * 订单表接口配置
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

export const orderAdd = {
  url: '/order/add',
  method: 'POST',
  rowKey:'id'
};

export const orderEdit = {
  url: '/order/edit',
  method: 'POST',
  rowKey:'id'
};

export const orderDelete = {
  url: '/order/delete',
  method: 'POST',
  rowKey:'id'
};

export const orderDetail = {
  url: '/order/detail',
  method: 'POST',
  rowKey:'id'
};

export const orderList = {
  url: '/order/list',
  method: 'POST',
  rowKey:'id'
};

export const orderIdList = {
  url: '/order/list',
  method: 'POST',
  rowKey:'orderId'
};

export const orderListSelect = {
  url: '/order/listSelect',
  method: 'POST',
  rowKey:'orderId'
};
export const orderBranchList = {
  url: '/orderBranch/list',
  method: 'POST',
  rowKey:'id'
};

export const orderBranchListSelect = {
  url: '/orderBranch/listSelect',
  method: 'POST',
  rowKey:'orderId'
};

export const ClientIdListSelect = {
  url: '/client/listSelect',
  method: 'POST',
};

export const orderIdSelect = {
  url:'/order/Select',
  method:'POST',
  rowKey:'orderId'

};
