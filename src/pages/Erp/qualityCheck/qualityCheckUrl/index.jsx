/**
 * 质检表接口配置
 *
 * @author song
 * @Date 2021-10-27 13:08:57
 */

export const qualityCheckAdd = {
  url: '/qualityCheck/add',
  method: 'POST',
  rowKey:'qualityCheckId'
};

export const qualityCheckEdit = {
  url: '/qualityCheck/edit',
  method: 'POST',
  rowKey:'qualityCheckId'
};

export const qualityCheckDelete = {
  url: '/qualityCheck/delete',
  method: 'POST',
  rowKey:'qualityCheckId'
};

export const qualityCheckDetail = {
  url: '/qualityCheck/detail',
  method: 'POST',
  rowKey:'qualityCheckId'
};

export const qualityCheckList = {
  url: '/qualityCheck/list',
  method: 'POST',
  rowKey:'qualityCheckId'
};

export const toolListSelect = {
  url: '/tool/listSelect',
  method: 'POST',
};

export const qualityCheckClassificationListSelect = {
  url: '/qualityCheckClassification/listSelect',
  method: 'POST',
};

