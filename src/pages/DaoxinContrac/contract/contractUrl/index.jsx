/**
 * 合同表接口配置
 *
 * @author 
 * @Date 2021-07-21 13:36:21
 */

export const contractAdd = {
  url: '/contract/add',
  method: 'POST',
  rowKey:'contractId'
};

export const contractEdit = {
  url: '/contract/edit',
  method: 'POST',
  rowKey:'contractId'
};

export const contractDelete = {
  url: '/contract/delete',
  method: 'POST',
  rowKey:'contractId'
};

export const contractDetail = {
  url: '/contract/detail',
  method: 'POST',
  rowKey:'contractId'
};

export const contractList = {
  url: '/contract/list',
  method: 'POST',
  rowKey:'contractId'
};

export const userIdSelect = {
  url: '/rest/mgr/listSelect',
  method: 'POST'
};
