/**
 * 套餐分表接口配置
 *
 * @author qr
 * @Date 2021-08-04 11:01:43
 */

export const erpPackageTableAdd = {
  url: '/erpPackageTable/add',
  method: 'POST',
  rowKey:'id'
};

export const erpPackageTableEdit = {
  url: '/erpPackageTable/edit',
  method: 'POST',
  rowKey:'id'
};

export const erpPackageTableDelete = {
  url: '/erpPackageTable/delete',
  method: 'POST',
  rowKey:'id'
};

export const erpPackageTableDetail = {
  url: '/erpPackageTable/detail',
  method: 'POST',
  rowKey:'id'
};

export const erpPackageTableList = {
  url: '/erpPackageTable/list',
  method: 'POST',
};

// 产品名称
export const ProductNameListSelect = {
  url: '/items/listSelect',
  method: 'POST',
};

export const erpPackageNameList = {
  url: '/erpPackage/listSelect',
  method: 'POST',
};

export const erpPackageTableBatchAdd = {
  url: '/erpPackageTable/batchAdd',
  method: 'POST',
};
