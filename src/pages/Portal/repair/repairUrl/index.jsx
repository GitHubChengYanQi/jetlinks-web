/**
 * 报修接口配置
 *
 * @author siqiang
 * @Date 2021-08-20 17:11:20
 */

export const repairAdd = {
  url: '/repair/add',
  method: 'POST',
  rowKey: 'repairId'
};

export const repairEdit = {
  url: '/repair/edit',
  method: 'POST',
  rowKey: 'repairId'
};

export const repairDelete = {
  url: '/repair/delete',
  method: 'POST',
  rowKey: 'repairId'
};

export const repairDetail = {
  url: '/repair/detail',
  method: 'POST',
  rowKey: 'repairId'
};

export const repairList = {
  url: '/repair/list',
  method: 'POST',
  rowKey: 'repairId'
};

export const companyIdSelect = {
  url: '/customer/listSelect',
  method: 'POST'
};
export const itemIdSelect = {
  url: '/items/listSelect',
  method: 'POST'
};
export const deliveryDetails = {
  url: '/deliveryDetails/listAll',
  method: 'POST'
};

export const CustomerIdListSelect = {
  url: '/customer/listSelect',
  method: 'POST',
};
export const delivery = {
  url: '/delivery/listAll',
  method: 'POST',
};


