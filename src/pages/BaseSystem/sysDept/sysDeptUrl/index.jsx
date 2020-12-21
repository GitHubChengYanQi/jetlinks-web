/**
 * 部门表接口配置
 *
 * @author 
 * @Date 2020-12-21 17:16:04
 */

export const sysDeptAdd = {
  url: '/sysDept/add',
  method: 'POST',
  rowKey:'deptId'
};

export const sysDeptEdit = {
  url: '/sysDept/edit',
  method: 'POST',
  rowKey:'deptId'
};

export const sysDeptDelete = {
  url: '/sysDept/delete',
  method: 'POST',
  rowKey:'deptId'
};

export const sysDeptDetail = {
  url: '/sysDept/detail',
  method: 'POST',
  rowKey:'deptId'
};

export const sysDeptList = {
  url: '/sysDept/list',
  method: 'POST',
  rowKey:'deptId'
};
export const sysDeptListSelect = {
  url: '/sysDept/listSelect',
  method: 'POST',
  rowKey:'deptId'
};
export const sysDeptTreeView = {
  url: '/sysDept/treeView',
  method: 'POST',
  rowKey:'deptId'
};
