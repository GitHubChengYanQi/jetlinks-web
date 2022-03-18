

/**
 * 客户管理表接口配置
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

export const supplierAdd = {
  url: '/supplier/add',
  method: 'POST',
  rowKey:'customerId'
};

export const supplierEdit = {
  url: '/supplier/edit',
  method: 'POST',
  rowKey:'customerId'
};


export const supplierDelete = {
  url: '/supplier/delete',
  method: 'POST',
  rowKey:'customerId'
};

export const supplierBatchDelete = {
  url: '/supplier/batchDelete',
  method: 'POST',
  rowKey:'customerId'
};

export const supplierDetail = {
  url: '/supplier/detail',
  method: 'POST',
  rowKey:'customerId'
};

export const supplierList = {
  url: '/supplier/list',
  method: 'POST',
  rowKey:'customerId'
};


export const supplierIdSelect = {
  url: '/supplier/listSelect',
  method: 'POST'
};



