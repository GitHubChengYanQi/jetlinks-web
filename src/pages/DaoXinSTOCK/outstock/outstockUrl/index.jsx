/**
 * 出库表接口配置
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

export const deliveryAdd = {
  url: '/outstock/add',
  method: 'POST',
  rowKey:'outstockId'
};

export const deliveryEdit = {
  url: '/outstock/edit',
  method: 'POST',
  rowKey:'outstockId'
};

export const deliveryDelete = {
  url: '/outstock/delete',
  method: 'POST',
  rowKey:'outstockId'
};

export const deliveryDetail = {
  url: '/outstock/detail',
  method: 'POST',
  rowKey:'outstockId'
};

export const deliveryList = {
  url: '/outstock/list',
  method: 'POST',
  rowKey:'outstockId'
};

export const deliveryTimeListSelect = {
  url:'/outstock/listSelect',
  method:'POST',
  rowKey:'outstockId'

};

export const brandIdSelect = {
  url: '/brand/listSelect',
  method: 'POST'
};



