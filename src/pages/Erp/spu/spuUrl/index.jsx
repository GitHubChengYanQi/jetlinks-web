/**
 * 接口配置
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

export const spuAdd = {
  url: '/spu/add',
  method: 'POST',
  rowKey:'spuId'
};

export const spuEdit = {
  url: '/spu/edit',
  method: 'POST',
  rowKey:'spuId'
};

export const spuDelete = {
  url: '/spu/delete',
  method: 'POST',
  rowKey:'spuId'
};

export const spuDetail = {
  url: '/spu/detail',
  method: 'POST',
  rowKey:'spuId'
};

export const spuList = {
  url: '/spu/list',
  method: 'POST',
  rowKey:'spuId'
};
export const categoryList = {
  url: '/category/listSelect',
  method: 'POST',
};
export const categoryTree = {
  url: '/category/treeView',
  method: 'POST',
};

export const materialIdSelect = {
  url: '/material/listSelect',
  method: 'POST'
};
export const unitListSelect = {
  url: '/unit/listSelect',
  method: 'POST',
  rowKey:'unitId'
};
export const spuClassificationListSelect = {
  url: '/spuClassification/listSelect',
  method: 'POST',
};

export const skuListSelect = {
  url: '/sku/listSelect',
  method: 'POST',
};


