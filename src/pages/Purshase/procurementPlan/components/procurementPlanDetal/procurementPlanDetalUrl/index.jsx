/**
 * 采购计划单子表整合数据后的子表接口配置
 *
 * @author song
 * @Date 2021-12-21 15:18:41
 */

export const procurementPlanDetalAdd = {
  url: '/procurementPlanDetal/add',
  method: 'POST',
  rowKey:'detailId'
};

export const procurementPlanDetalEdit = {
  url: '/procurementPlanDetal/edit',
  method: 'POST',
  rowKey:'detailId'
};

export const procurementPlanDetalDelete = {
  url: '/procurementPlanDetal/delete',
  method: 'POST',
  rowKey:'detailId'
};

export const procurementPlanDetalDetail = {
  url: '/procurementPlanDetal/detail',
  method: 'POST',
  rowKey:'detailId'
};

export const procurementPlanDetalList = {
  url: '/procurementPlanDetal/list',
  method: 'POST',
  rowKey:'detailId'
};

