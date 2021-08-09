/**
 * 客户级别表接口配置
 *
 * @author
 * @Date 2021-07-30 13:00:02
 */

export const crmCustomerLevelAdd = {
  url: '/crmCustomerLevel/add',
  method: 'POST',
  rowKey:'customerLevelId'
};

export const crmCustomerLevelEdit = {
  url: '/crmCustomerLevel/edit',
  method: 'POST',
  rowKey:'customerLevelId'
};

export const crmCustomerLevelDelete = {
  url: '/crmCustomerLevel/delete',
  method: 'POST',
  rowKey:'customerLevelId'
};

export const crmCustomerLevelDetail = {
  url: '/crmCustomerLevel/detail',
  method: 'POST',
  rowKey:'customerLevelId'
};

export const crmCustomerLevelList = {
  url: '/crmCustomerLevel/list',
  method: 'POST',
  rowKey:'customerLevelId'
};

export const customerLevelIdSelect = {
  url: '/customer/listSelect',
  method: 'POST'
};
