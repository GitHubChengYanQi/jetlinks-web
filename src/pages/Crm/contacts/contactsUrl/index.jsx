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
export const batchDelete = {
  url: '/contacts/batchDelete',
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

export const customerIdSelect = {
  url: '/customer/listSelect',
  method: 'POST'
};
export const companyRoleSelect = {
  url: '/companyRole/listSelect',
  method: 'POST'
};
export const contactsBind = {
  url: '/contactsBind/delete',
  method: 'POST'
};
