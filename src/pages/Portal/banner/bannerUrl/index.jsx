/**
 * 轮播图接口配置
 *
 * @author
 * @Date 2021-08-17 14:05:06
 */

export const bannerAdd = {
  url: '/banner/add',
  method: 'POST',
  rowKey:'bannerId'
};

export const bannerEdit = {
  url: '/banner/edit',
  method: 'POST',
  rowKey:'bannerId'
};

export const bannerDelete = {
  url: '/banner/delete',
  method: 'POST',
  rowKey:'bannerId'
};

export const bannerDetail = {
  url: '/banner/detail',
  method: 'POST',
  rowKey:'bannerId'
};

export const bannerList = {
  url: '/banner/list',
  method: 'POST',
  rowKey:'bannerId'
};
export const getToken = {
  url: '/media/getToken',
  method: 'GET'
};

export const Difference = {
  url: '/bannerDifference/listSelect',
  method: 'POST'
};

