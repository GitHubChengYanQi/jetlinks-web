

/**
 * 客户管理表接口配置
 *
 * @author
 * @Date 2021-07-23 10:06:12
 */

export const customerAdd = {
  url: '/customer/add',
  method: 'POST',
  rowKey:'customerId'
};

export const customerEdit = {
  url: '/customer/edit',
  method: 'POST',
  rowKey:'customerId'
};


export const customerDelete = {
  url: '/customer/delete',
  method: 'POST',
  rowKey:'customerId'
};

export const customerBatchDelete = {
  url: '/customer/batchDelete',
  method: 'POST',
  rowKey:'customerId'
};

export const customerDetail = {
  url: '/customer/detail',
  method: 'POST',
  rowKey:'customerId'
};

export const customerEnterprise = {
  url: '/customer/enterprise',
  method: 'GET',
};

export const customerList = {
  url: '/customer/list',
  method: 'POST',
  rowKey:'customerId'
};


export const customerIdSelect = {
  url: '/customer/listSelect',
  method: 'POST'
};

export const CustomerLevelIdSelect = {
  url: '/crmCustomerLevel/listSelect',
  method: 'POST'
};

export const OriginIdSelect = {
  url: '/origin/listSelect',
  method: 'POST'
};

export const UserIdSelect = {
  url: '/rest/mgr/Select',
  method: 'POST',
};
export const CompanyRoleIdSelect = {
  url: '/companyRole/listSelect',
  method: 'POST',
};

export const CrmIndustryIdSelect = {
  url: '/crmIndustry/list',
  method: 'POST',
};

export const crmIndustryTreeView = {
  url: '/crmIndustry/treeView',
  method: 'POST',
  rowKey:'industryId'
};

export const commonArea = {
  url: '/commonArea/treeView',
  method: 'POST',
};




