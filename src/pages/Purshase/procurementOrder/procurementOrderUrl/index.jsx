/**
 * 采购单接口配置
 *
 * @author song
 * @Date 2022-01-13 13:09:54
 */

export const procurementOrderAdd = {
  url: '/procurementOrder/addOrder',
  method: 'POST',
  rowKey:'procurementOrderId'
};

export const procurementOrderEdit = {
  url: '/procurementOrder/edit',
  method: 'POST',
  rowKey:'procurementOrderId'
};

export const procurementOrderDelete = {
  url: '/procurementOrder/delete',
  method: 'POST',
  rowKey:'procurementOrderId'
};

export const procurementOrderDetail = {
  url: '/procurementOrder/detail',
  method: 'POST',
  rowKey:'procurementOrderId'
};

export const procurementOrderList = {
  url: '/procurementOrder/list',
  method: 'POST',
  rowKey:'procurementOrderId'
};

