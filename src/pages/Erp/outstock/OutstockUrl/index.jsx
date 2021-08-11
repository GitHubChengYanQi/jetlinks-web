/**
 * 出库表接口配置
 *
 * @author song
 * @Date 2021-07-17 10:46:08
 */

export const outstockAdd = {
  url: '/outstock/add',
  method: 'POST',
  rowKey:'outstockId'
};

export const outstockEdit = {
  url: '/outstock/edit',
  method: 'POST',
  rowKey:'outstockId'
};

export const outstockDelete = {
  url: '/outstock/delete',
  method: 'POST',
  rowKey:'outstockId'
};

export const outstockDetail = {
  url: '/outstock/detail',
  method: 'POST',
  rowKey:'outstockId'
};

export const outstockList = {
  url: '/outstock/list',
  method: 'POST',
  rowKey:'outstockId'
};

export const outstockTimeListSelect = {
  url:'/outstock/listSelect',
  method:'POST',
  rowKey:'outstockId'

};

export const brandIdSelect = {
  url: '/brand/listSelect',
  method: 'POST'
};
export const itemsIdSelect = {
  url: '/items/listSelect',
  method: 'POST'
};



