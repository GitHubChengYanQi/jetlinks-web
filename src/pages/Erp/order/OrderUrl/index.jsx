import Select from "@/components/Select";
import React from "react";

/**
 * 货单表接口配置
 *
 * @author ta
 * @Date 2021-07-20 16:22:28
 */

export const orderAdd = {
  url: '/erpOrder/add',
  method: 'POST',
  rowKey:'id'
};

export const orderEdit = {
  url: '/erpOrder/edit',
  method: 'POST',
  rowKey:'orderId'
};

export const orderDelete = {
  url: '/erpOrder/delete',
  method: 'POST',
  rowKey:'orderId'
};

export const orderDetail = {
  url: '/erpOrder/detail',
  method: 'POST',
  rowKey:'order_id'
};

export const orderList = {
  url: '/erpOrder/list',
  method: 'POST',
  rowKey:'orderId'
};

export const locationListSelect = {
  url: '/adress/listSelect',
  method: 'POST',
  rowKey:'ClientId'
};

export const deliveryTimeListSelect = {
  url:'/delivery/list',
  method:'POST',
  rwoKey:'deliveryId'
};


export const OrderIdListSelect = {
  url:'/contacts/listSelect',
  method:'POST',
  rowKey:'ContactsId'
};

// 产品名称
export const ProductNameListSelect = {
  url: '/items/listSelect',
  method: 'POST',
};

export const CustomerListSelect = {
  url: '/customer/listSelect',
  method: 'POST',
};

export const customerIdSelect = {
  url: '/customer/listSelect',
  method: 'POST'
};

export const contactsIdSelect = {
  url: '/contacts/listSelect',
  method: 'POST'
};

export const phoneSelect = {
  url: '/phone/listSelect',
  method: 'POST'
};
