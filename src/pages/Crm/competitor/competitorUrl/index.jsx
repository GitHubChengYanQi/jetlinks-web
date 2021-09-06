/**
 * 竞争对手管理接口配置
 *
 * @author
 * @Date 2021-09-06 13:44:14
 */

export const competitorAdd = {
  url: '/competitor/add',
  method: 'POST',
  rowKey:'competitorId'
};

export const competitorEdit = {
  url: '/competitor/edit',
  method: 'POST',
  rowKey:'competitorId'
};

export const competitorDelete = {
  url: '/competitor/delete',
  method: 'POST',
  rowKey:'competitorId'
};

export const competitorDetail = {
  url: '/competitor/detail',
  method: 'POST',
  rowKey:'competitorId'
};

export const competitorList = {
  url: '/competitor/list',
  method: 'POST',
  rowKey:'competitorId'
};
export const BusinessIdList = {
  url: '/crmBusiness/listSelect',
  method: 'POST',
};

