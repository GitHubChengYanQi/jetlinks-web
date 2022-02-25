/**
 * 物品分类表接口配置
 *
 * @author
 * @Date 2021-10-18 10:54:16
 */

export const categoryAdd = {
  url: '/category/addList',
  method: 'POST',
  rowKey:'categoryId'
};

export const categoryEdit = {
  url: '/category/edit',
  method: 'POST',
  rowKey:'categoryId'
};

export const categoryDelete = {
  url: '/category/delete',
  method: 'POST',
  rowKey:'categoryId'
};

export const categoryDetail = {
  url: '/category/detail',
  method: 'POST',
  rowKey:'categoryId'
};

export const categoryList = {
  url: '/category/list',
  method: 'POST',
  rowKey:'categoryId'
};
export const categoryDeleteBatch = {
  url: '/category/deleteBatch',
  method: 'POST',
  rowKey:'categoryId'
};


