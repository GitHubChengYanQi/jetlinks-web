/**
 * 出库申请接口配置
 *
 * @author song
 * @Date 2021-09-14 16:49:41
 */

export const outstockApplyAdd = {
  url: '/outstockApply/add',
  method: 'POST',
  rowKey:'outstockApplyId'
};

export const outstockApplyEdit = {
  url: '/outstockApply/edit',
  method: 'POST',
  rowKey:'outstockApplyId'
};

export const outstockApplyDelete = {
  url: '/outstockApply/delete',
  method: 'POST',
  rowKey:'outstockApplyId'
};

export const outstockApplyDetail = {
  url: '/outstockApply/detail',
  method: 'POST',
  rowKey:'outstockApplyId'
};

export const outstockApplyList = {
  url: '/outstockApply/list',
  method: 'POST',
  rowKey:'outstockApplyId'
};

export const Items = {
  url: '/items/listSelect',
  method: 'POST',
};

export const Brands = {
  url: '/brand/listSelect',
  method: 'POST',
};
export const UserIdSelect = {
  url: '/rest/mgr/Select',
  method: 'POST',
};

export const CustomerNameListSelect = {
  url: '/customer/listSelect',
  method: 'POST',
};
