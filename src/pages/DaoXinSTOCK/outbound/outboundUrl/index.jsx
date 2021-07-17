/**
 * 出库表接口配置
 *
 * @author
 * @Date 2021-07-15 17:41:40
 */

export const outboundAdd = {
  url: '/outbound/add',
  method: 'POST',
  rowKey:'outboundId'
};

export const outboundEdit = {
  url: '/outbound/edit',
  method: 'POST',
  rowKey:'outboundId'
};

export const outboundDelete = {
  url: '/outbound/delete',
  method: 'POST',
  rowKey:'outboundId'
};

export const outboundDetail = {
  url: '/outbound/detail',
  method: 'POST',
  rowKey:'outboundId'
};

export const outboundList = {
  url: '/outbound/list',
  method: 'POST',
  rowKey:'outboundId'
};

export const itemIdSelect = {
  url: '/items/listSelect',
  method: 'POST'
};
export const placeIdSelect = {
  url: '/place/listSelect',
  method: 'POST'
};
