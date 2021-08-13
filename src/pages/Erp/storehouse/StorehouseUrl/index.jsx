/**
 * 地点表接口配置
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

export const storehouseAdd = {
  url: '/storehouse/add',
  method: 'POST',
  rowKey:'storehouseId'
};

export const storehouseEdit = {
  url: '/storehouse/edit',
  method: 'POST',
  rowKey:'storehouseId'
};

export const storehouseDelete = {
  url: '/storehouse/delete',
  method: 'POST',
  rowKey:'storehouseId'
};
export const batchDelete = {
  url: '/storehouse/batchDelete',
  method: 'POST',
  rowKey:'storehouseId'
};

export const storehouseDetail = {
  url: '/storehouse/detail',
  method: 'POST',
  rowKey:'storehouseId'
};

export const storehouseList = {
  url: '/storehouse/list',
  method: 'POST',
  rowKey:'storehouseId'
};


