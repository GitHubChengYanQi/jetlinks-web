/**
 * 付款模板接口配置
 *
 * @author song
 * @Date 2022-02-24 10:36:06
 */

export const paymentTemplateAdd = {
  url: '/paymentTemplate/add',
  method: 'POST',
  rowKey:'templateId'
};

export const paymentTemplateEdit = {
  url: '/paymentTemplate/edit',
  method: 'POST',
  rowKey:'templateId'
};

export const paymentTemplateDelete = {
  url: '/paymentTemplate/delete',
  method: 'POST',
  rowKey:'templateId'
};

export const paymentTemplateDetail = {
  url: '/paymentTemplate/detail',
  method: 'POST',
  rowKey:'templateId'
};

export const paymentTemplateList = {
  url: '/paymentTemplate/list',
  method: 'POST',
  rowKey:'templateId'
};

export const paymentTemplateListSelect = {
  url: '/paymentTemplate/listSelect',
  method: 'POST',
  rowKey:'templateId'
};

