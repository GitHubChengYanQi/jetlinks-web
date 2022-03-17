/**
 * 接口配置
 *
 * @author Captain_Jazz
 * @Date 2022-03-15 08:54:48
 */

export const commonMediaAdd = {
  url: '/commonMedia/add',
  method: 'POST',
  rowKey:'mediaId'
};

export const commonMediaEdit = {
  url: '/commonMedia/edit',
  method: 'POST',
  rowKey:'mediaId'
};

export const commonMediaDelete = {
  url: '/commonMedia/delete',
  method: 'POST',
  rowKey:'mediaId'
};

export const commonMediaDetail = {
  url: '/commonMedia/detail',
  method: 'POST',
  rowKey:'mediaId'
};

export const getMediaPath = {
  url: '/media/getMediaPathById',
  method: 'GET',
};

export const commonMediaList = {
  url: '/media/sortPagelist',
  method: 'POST',
  rowKey:'mediaId'
};

