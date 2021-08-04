/**
 * 仓库产品明细表接口配置
 *
 * @author
 * @Date 2021-07-15 11:13:02
 */

export const stockDetailsAdd = {
  url: '/stockDetails/add',
  method: 'POST',
  rowKey:'stockItemId'
};

export const stockDetailsEdit = {
  url: '/stockDetails/edit',
  method: 'POST',
  rowKey:'stockItemId'
};

export const stockDetailsDelete = {
  url: '/stockDetails/delete',
  method: 'POST',
  rowKey:'stockItemId'
};

export const stockDetailsDetail = {
  url: '/stockDetails/detail',
  method: 'POST',
  rowKey:'stockItemId'
};

export const stockDetailsList = {
  url: '/stockDetails/list',
  method: 'POST',
  rowKey:'stockItemId'
};

export const stockIdSelect = {
  url: '/stock/listSelect',
  method:'POST',
  rowKey:'stockItemId'
};
