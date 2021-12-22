/**
 * 采购计划主表接口配置
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

export const procurementPlanAdd = {
  url: '/procurementPlan/add',
  method: 'POST',
  rowKey:'procurementPlanId'
};

export const procurementPlanEdit = {
  url: '/procurementPlan/edit',
  method: 'POST',
  rowKey:'procurementPlanId'
};

export const procurementPlanDelete = {
  url: '/procurementPlan/delete',
  method: 'POST',
  rowKey:'procurementPlanId'
};

export const procurementPlanDetail = {
  url: '/procurementPlan/detail',
  method: 'POST',
  rowKey:'procurementPlanId'
};

export const procurementPlanList = {
  url: '/procurementPlan/list',
  method: 'POST',
  rowKey:'procurementPlanId'
};

