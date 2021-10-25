/**
 * 工具表接口配置
 *
 * @author song
 * @Date 2021-10-23 10:40:17
 */

export const toolAdd = {
  url: '/tool/add',
  method: 'POST',
  rowKey:'toolId'
};

export const toolEdit = {
  url: '/tool/edit',
  method: 'POST',
  rowKey:'toolId'
};

export const toolDelete = {
  url: '/tool/delete',
  method: 'POST',
  rowKey:'toolId'
};

export const toolDetail = {
  url: '/tool/detail',
  method: 'POST',
  rowKey:'toolId'
};

export const toolList = {
  url: '/tool/list',
  method: 'POST',
  rowKey:'toolId'
};


export const toolClassificationListSelect = {
  url: '/toolClassification/listSelect',
  method: 'POST',
};


export const unitListSelect = {
  url: '/unit/listSelect',
  method: 'POST',
  rowKey:'unitId'
};


export const codingRulesListSelect = {
  url: '/codingRules/listSelect',
  method: 'POST',
};

export const codingRulesList = {
  url: '/codingRules/list',
  method: 'POST',
};
