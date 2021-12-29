/**
 * 盘点任务主表接口配置
 *
 * @author Captain_Jazz
 * @Date 2021-12-27 09:27:27
 */

export const inventoryAdd = {
  url: '/inventory/add',
  method: 'POST',
  rowKey:'inventoryTaskId'
};

export const inventoryEdit = {
  url: '/inventory/edit',
  method: 'POST',
  rowKey:'inventoryTaskId'
};

export const inventoryDelete = {
  url: '/inventory/delete',
  method: 'POST',
  rowKey:'inventoryTaskId'
};

export const inventoryDetail = {
  url: '/inventory/detail',
  method: 'POST',
  rowKey:'inventoryTaskId'
};

export const inventoryList = {
  url: '/inventory/list',
  method: 'POST',
  rowKey:'inventoryTaskId'
};

