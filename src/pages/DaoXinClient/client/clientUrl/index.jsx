/**
 * 客户管理表接口配置
 *
 * @author ta
 * @Date 2021-07-19 14:50:54
 */

export const clientAdd = {
  url: '/client/add',
  method: 'POST',
  rowKey:'clientId'
};

export const clientEdit = {
  url: '/client/edit',
  method: 'POST',
  rowKey:'clientId'
};

export const clientDelete = {
  url: '/client/delete',
  method: 'POST',
  rowKey:'clientId'
};

export const clientDetail = {
  url: '/client/detail',
  method: 'POST',
  rowKey:'clientId'
};

export const clientList = {
  url: '/client/list',
  method: 'POST',
  rowKey:'clientId'
};

export const AdressSelect = {
  url: '/adress/listSelect',
  method: 'POST'
};

export const adressIdListSelect = {
  url:'/adress/listSelect',
  method:'POST',
  rowKey:'adressId'

};


export const contactsIdListSelect = {
  url: '/contacts/listSelect',
  method: 'POST',
  rowKey:'contactsId'
};

export const contactsList = {
  url: '/contacts/listSelect',
  method: 'POST',
  rowKey:'contactsId'
};
