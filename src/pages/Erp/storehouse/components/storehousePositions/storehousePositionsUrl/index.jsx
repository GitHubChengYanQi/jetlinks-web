/**
 * 仓库库位表接口配置
 *
 * @author song
 * @Date 2021-10-29 09:22:25
 */

export const storehousePositionsAdd = {
  url: '/storehousePositions/add',
  method: 'POST',
  rowKey:'storehousePositionsId'
};

export const storehousePositionsEdit = {
  url: '/storehousePositions/edit',
  method: 'POST',
  rowKey:'storehousePositionsId'
};

export const storehousePositionsDelete = {
  url: '/storehousePositions/delete',
  method: 'POST',
  rowKey:'storehousePositionsId'
};

export const storehousePositionsDetail = {
  url: '/storehousePositions/detail',
  method: 'POST',
  rowKey:'storehousePositionsId'
};

export const storehousePositionsList = {
  url: '/storehousePositions/list',
  method: 'POST',
  rowKey:'storehousePositionsId'
};
export const storehousePositionsListSelect = {
  url: '/storehousePositions/listSelect',
  method: 'POST',
  rowKey:'storehousePositionsId'
};
export const storehousePositionsTreeView = {
  url: '/storehousePositions/treeView',
  method: 'GET',
  rowKey:'storehousePositionsId'
};

