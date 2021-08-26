/**
 * 提醒表接口配置
 *
 * @author cheng
 * @Date 2021-08-26 15:50:39
 */

export const remindAdd = {
  url: '/remind/add',
  method: 'POST',
  rowKey:'remindId'
};

export const remindEdit = {
  url: '/remind/edit',
  method: 'POST',
  rowKey:'remindId'
};

export const remindDelete = {
  url: '/remind/delete',
  method: 'POST',
  rowKey:'remindId'
};

export const remindDetail = {
  url: '/remind/detail',
  method: 'POST',
  rowKey:'remindId'
};

export const remindList = {
  url: '/remind/list',
  method: 'POST',
  rowKey:'remindId'
};

export const userIdSelect = {
  url: '/rest/mgr/Select',
  method: 'POST'
};
