/**
 * 客户级别表接口配置
 *
 * @author 
 * @Date 2021-07-30 13:00:02
 */

export const crmCustomerLevelAdd = {
  url: '/crmCustomerLevel/add',
  method: 'POST',
  rowKey:'id'
};

export const crmCustomerLevelEdit = {
  url: '/crmCustomerLevel/edit',
  method: 'POST',
  rowKey:'id'
};

export const crmCustomerLevelDelete = {
  url: '/crmCustomerLevel/delete',
  method: 'POST',
  rowKey:'id'
};

export const crmCustomerLevelDetail = {
  url: '/crmCustomerLevel/detail',
  method: 'POST',
  rowKey:'id'
};

export const crmCustomerLevelList = {
  url: '/crmCustomerLevel/list',
  method: 'POST',
  rowKey:'id'
};

export const customerLevelIdSelect = {
  url: '/customer/listSelect',
  method: 'POST'
};
