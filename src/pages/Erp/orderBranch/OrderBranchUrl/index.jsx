/**
 * 货单分表接口配置
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

export const orderBranchAdd = {
  url: '/orderBranch/add',
  method: 'POST',
  rowKey:'id'
};

export const orderBranchEdit = {
  url: '/orderBranch/edit',
  method: 'POST',
  rowKey:'id'
};

export const orderBranchDelete = {
  url: '/orderBranch/delete',
  method: 'POST',
  rowKey:'id'
};

export const orderBranchDetail = {
  url: '/orderBranch/detail',
  method: 'POST',
  rowKey:'id'
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
export const orderIdSelect = {
  url: '/order/Select',
  method: 'POST',
  rowKey:'orderId'
};

