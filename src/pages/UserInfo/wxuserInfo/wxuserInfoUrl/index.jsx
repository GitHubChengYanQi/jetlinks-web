/**
 * 用户小程序关联接口配置
 *
 * @author cheng
 * @Date 2021-09-14 08:37:48
 */

export const wxuserInfoAdd = {
  url: '/wxuserInfo/add',
  method: 'POST',
  rowKey:'userInfoId'
};

export const wxuserInfoEdit = {
  url: '/wxuserInfo/edit',
  method: 'POST',
  rowKey:'userInfoId'
};

export const wxuserInfoDelete = {
  url: '/wxuserInfo/delete',
  method: 'POST',
  rowKey:'userInfoId'
};

export const wxuserInfoDetail = {
  url: '/wxuserInfo/detail',
  method: 'POST',
  rowKey:'userInfoId'
};

export const wxuserInfoList = {
  url: '/wxuserInfo/list',
  method: 'POST',
  rowKey:'userInfoId'
};

export const UserIdSelect = {
  url: '/rest/mgr/Select',
  method: 'POST',
};

export const binding = {
  url: '/api/binds',
  method: 'POST',
};
export const MemberId = {
  url: '/openUserInfo/listSelect',
  method: 'POST',
};


