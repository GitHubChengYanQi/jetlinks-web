import {AdressSelect} from '@/pages/DaoxinClient/client/clientUrl';

/**
 * 客户地址表接口配置
 *
 * @author ta
 * @Date 2021-07-19 14:50:54
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

export const nameListSelect = {
  url: '/client/listSelect',
  method: 'POST'

};

export const adressIdListSelect = {
  url: '/adress/listSelect',
  method: 'POST'

};

export const locatIdListSelect = {
  url: '/adress/listSelect',
  method: 'POST'

};



