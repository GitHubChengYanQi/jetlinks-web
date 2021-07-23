/**
 * 联系人表接口配置
 *
 * @author 
 * @Date 2021-07-23 10:06:12
 */

export const contactsAdd = {
  url: '/contacts/add',
  method: 'POST',
  rowKey:'contactsId'
};

export const contactsEdit = {
  url: '/contacts/edit',
  method: 'POST',
  rowKey:'contactsId'
};

export const contactsDelete = {
  url: '/contacts/delete',
  method: 'POST',
  rowKey:'contactsId'
};

export const contactsDetail = {
  url: '/contacts/detail',
  method: 'POST',
  rowKey:'contactsId'
};

export const contactsList = {
  url: '/contacts/list',
  method: 'POST',
  rowKey:'contactsId'
};

export const contactsIdSelect = {
  url: '/client/listSelect',
  method: 'POST'
};
export const clientIdSelect = {
  url: '/client/listSelect',
  method: 'POST'
};
