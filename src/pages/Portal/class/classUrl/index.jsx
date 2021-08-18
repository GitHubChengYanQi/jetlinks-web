/**
 * 分类导航接口配置
 *
 * @author siqiang
 * @Date 2021-08-18 15:53:56
 */

export const classAdd = {
  url: '/class/add',
  method: 'POST',
  rowKey:'classId'
};

export const classEdit = {
  url: '/class/edit',
  method: 'POST',
  rowKey:'classId'
};

export const classDelete = {
  url: '/class/delete',
  method: 'POST',
  rowKey:'classId'
};

export const classDetail = {
  url: '/class/detail',
  method: 'POST',
  rowKey:'classId'
};

export const classList = {
  url: '/class/list',
  method: 'POST',
  rowKey:'classId'
};

export const classificationIdSelect = {
  url: '/bannerDifference/listSelect',
  method: 'POST'
};
