/**
 * 导航表接口配置
 *
 * @author
 * @Date 2021-08-18 08:40:30
 */

export const navigationAdd = {
  url: '/navigation/add',
  method: 'POST',
  rowKey:'navigationId'
};

export const navigationEdit = {
  url: '/navigation/edit',
  method: 'POST',
  rowKey:'navigationId'
};

export const navigationDelete = {
  url: '/navigation/delete',
  method: 'POST',
  rowKey:'navigationId'
};
export const batchDelete = {
  url: '/navigation/batchDelete',
  method: 'POST',
  rowKey:'navigationId'
};

export const navigationDetail = {
  url: '/navigation/detail',
  method: 'POST',
  rowKey:'navigationId'
};

export const navigationList = {
  url: '/navigation/list',
  method: 'POST',
  rowKey:'navigationId'
};
export const Difference = {
  url: '/navigationDifference/listSelect',
  method: 'POST'
};

export const dataClassificationSelect = {
  url: '/dataClassification/listSelect',
  method: 'POST',
};
