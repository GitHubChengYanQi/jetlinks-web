/**
 * 客户地址表接口配置
 *
 * @author 
 * @Date 2021-07-16 12:55:35
 */

export const adressAdd = {
  url: '/adress/add',
  method: 'POST',
  rowKey:'adressId'
};

export const adressEdit = {
  url: '/adress/edit',
  method: 'POST',
  rowKey:'adressId'
};

export const adressDelete = {
  url: '/adress/delete',
  method: 'POST',
  rowKey:'adressId'
};

export const adressDetail = {
  url: '/adress/detail',
  method: 'POST',
  rowKey:'adressId'
};

export const adressList = {
  url: '/adress/list',
  method: 'POST',
  rowKey:'adressId'
};
