/**
 * 商机表接口配置
 *
 * @author cheng
 * @Date 2021-07-19 15:13:58
 */

export const businessAdd = {
  url: '/business/add',
  method: 'POST',
  rowKey:'businessId'
};

export const businessEdit = {
  url: '/business/edit',
  method: 'POST',
  rowKey:'businessId'
};

export const businessDelete = {
  url: '/business/delete',
  method: 'POST',
  rowKey:'businessId'
};

export const businessDetail = {
  url: '/business/detail',
  method: 'POST',
  rowKey:'businessId'
};

export const businessList = {
  url: '/business/list',
  method: 'POST',
  rowKey:'businessId'
};

export const ClientList = {
  url: '/client/list',
  method: 'POST',
};

export const SourceIdSelect = {
  url: '/source/listSelect',
  method: 'POST',
};

export const UserIdSelect = {
  url: '/rest/mgr/listSelect',
  method: 'POST',
};


