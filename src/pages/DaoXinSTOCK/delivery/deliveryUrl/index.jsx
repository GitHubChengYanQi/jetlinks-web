/**
 * 出库表接口配置
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

export const deliveryAdd = {
  url: '/delivery/add',
  method: 'POST',
  rowKey:'deliveryId'
};

export const deliveryEdit = {
  url: '/delivery/edit',
  method: 'POST',
  rowKey:'deliveryId'
};

export const deliveryDelete = {
  url: '/delivery/delete',
  method: 'POST',
  rowKey:'deliveryId'
};

export const deliveryDetail = {
  url: '/delivery/detail',
  method: 'POST',
  rowKey:'deliveryId'
};

export const deliveryList = {
  url: '/delivery/list',
  method: 'POST',
  rowKey:'deliveryId'
};

export const stockIdSelect = {
  url: '/stock/listSelect',
  method: 'POST'
};
export const brandSelect = {
  url: '/brand/listSelect',
  method: 'POST'
};
export const deliveryTimeListSelect = {
  url:'/delivery/listSelect',
  method:'POST',
  rowKey:'deliveryId'

};


