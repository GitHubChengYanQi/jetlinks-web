/**
 * 物流表接口配置
 *
 * @author
 * @Date 2021-07-15 17:41:40
 */

export const logisticsAdd = {
  url: '/logistics/add',
  method: 'POST',
  rowKey:'logisticsId'
};

export const logisticsEdit = {
  url: '/logistics/edit',
  method: 'POST',
  rowKey:'logisticsId'
};

export const logisticsDelete = {
  url: '/logistics/delete',
  method: 'POST',
  rowKey:'logisticsId'
};

export const logisticsDetail = {
  url: '/logistics/detail',
  method: 'POST',
  rowKey:'logisticsId'
};

export const logisticsList = {
  url: '/logistics/list',
  method: 'POST',
  rowKey:'logisticsId'
};

export const orderIdSelect = {
  url: '/order/listSelect',
  method: 'POST'
};
export const clientIdSelect = {
  url: '/client/listSelect',
  method: 'POST'
};
