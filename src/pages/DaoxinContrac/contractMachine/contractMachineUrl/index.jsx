/**
 * 机床合同表接口配置
 *
 * @author 
 * @Date 2021-07-20 13:34:41
 */

export const contractMachineAdd = {
  url: '/contractMachine/add',
  method: 'POST',
  rowKey:'contractId'
};

export const contractMachineEdit = {
  url: '/contractMachine/edit',
  method: 'POST',
  rowKey:'contractId'
};

export const contractMachineDelete = {
  url: '/contractMachine/delete',
  method: 'POST',
  rowKey:'contractId'
};

export const contractMachineDetail = {
  url: '/contractMachine/detail',
  method: 'POST',
  rowKey:'contractId'
};

export const contractMachineList = {
  url: '/contractMachine/list',
  method: 'POST',
  rowKey:'contractId'
};

export const purchaseUnitIdSelect = {
  url: '/client/listSelect',
  method: 'POST'
};
export const supplyUnitIdSelect = {
  url: '/client/listSelect',
  method: 'POST'
};
