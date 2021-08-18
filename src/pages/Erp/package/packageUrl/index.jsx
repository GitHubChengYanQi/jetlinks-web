/**
 * 套餐表接口配置
 *
 * @author qr
 * @Date 2021-08-04 11:01:43
 */

export const erpPackageAdd = {
  url: '/erpPackage/add',
  method: 'POST',
  rowKey:'packageId'
};

export const erpPackageEdit = {
  url: '/erpPackage/edit',
  method: 'POST',
  rowKey:'packageId'
};

export const erpPackageDelete = {
  url: '/erpPackage/delete',
  method: 'POST',
  rowKey:'packageId'
};

export const batchDelete = {
  url: '/erpPackage/batchDelete',
  method: 'POST',
};

export const erpPackageDetail = {
  url: '/erpPackage/detail',
  method: 'POST',
  rowKey:'packageId'
};

export const erpPackageList = {
  url: '/erpPackage/list',
  method: 'POST',
  rowKey:'packageId'
};

// 产品名称
export const ProductNameListSelect = {
  url: '/items/listSelect',
  method: 'POST',
};

