/**
 * 项目明细表接口配置
 *
 * @author qr
 * @Date 2021-08-04 13:17:57
 */

export const crmBusinessDetailedAdd = {
  url: '/crmBusinessDetailed/add',
  method: 'POST',
  rowKey:'id'
};

export const crmBusinessDetailedEdit = {
  url: '/crmBusinessDetailed/edit',
  method: 'POST',
  rowKey:'id'
};

export const crmBusinessDetailedDelete = {
  url: '/crmBusinessDetailed/delete',
  method: 'POST',
  rowKey:'id'
};

export const crmBusinessDetailedDetail = {
  url: '/crmBusinessDetailed/detail',
  method: 'POST',
  rowKey:'id'
};

export const crmBusinessDetailedList = {
  url: '/crmBusinessDetailed/list',
  method: 'POST',
  rowKey:'id'
};

export const BusinessId = {
  url: '/crmBusiness/listSelect',
  method: 'POST',
};
// 产品名称
export const ProductNameListSelect = {
  url: '/items/listSelect',
  method: 'POST',
};
