/**
 * 资料接口配置
 *
 * @author song
 * @Date 2021-09-11 13:35:54
 */

export const dataAdd = {
  url: '/data/add',
  method: 'POST',
  rowKey:'dataId'
};

export const dataEdit = {
  url: '/data/edit',
  method: 'POST',
  rowKey:'dataId'
};

export const dataDelete = {
  url: '/data/delete',
  method: 'POST',
  rowKey:'dataId'
};

export const dataDetail = {
  url: '/data/detail',
  method: 'POST',
  rowKey:'dataId'
};

export const dataList = {
  url: '/data/list',
  method: 'POST',
  rowKey:'dataId'
};
export const itemIdSelect = {
  url: '/items/listSelect',
  method: 'POST',
  rowKey:'dataId'
};
export const dataClassificationSelect = {
  url: '/dataClassification/listSelect',
  method: 'POST',
};


