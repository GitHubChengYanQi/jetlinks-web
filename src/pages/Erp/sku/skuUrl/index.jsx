/**
 * sku表接口配置
 *
 * @author
 * @Date 2021-10-18 14:14:21
 */

export const skuAdd = {
  url: '/sku/add',
  method: 'POST',
};

export const skuEdit = {
  url: '/sku/edit',
  method: 'POST',
};

export const skuDelete = {
  url: '/sku/delete',
  method: 'POST',
  rowKey:'skuId'
};

export const skuDetail = {
  url: '/sku/detail',
  method: 'POST',
};

export const skuList = {
  url: '/sku/list',
  method: 'POST',
  rowKey:'skuId'
};

export const deleteBatch = {
  url: '/sku/deleteBatch',
  method: 'POST',
};

