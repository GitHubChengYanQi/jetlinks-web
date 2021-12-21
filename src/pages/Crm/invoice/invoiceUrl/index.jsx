/**
 * 供应商开票接口配置
 *
 * @author song
 * @Date 2021-12-20 11:29:00
 */

export const invoiceAdd = {
  url: '/invoice/add',
  method: 'POST',
  rowKey:'invoiceId'
};

export const invoiceEdit = {
  url: '/invoice/edit',
  method: 'POST',
  rowKey:'invoiceId'
};

export const invoiceDelete = {
  url: '/invoice/delete',
  method: 'POST',
  rowKey:'invoiceId'
};

export const invoiceDetail = {
  url: '/invoice/detail',
  method: 'POST',
  rowKey:'invoiceId'
};

export const invoiceList = {
  url: '/invoice/list',
  method: 'POST',
  rowKey:'invoiceId'
};

