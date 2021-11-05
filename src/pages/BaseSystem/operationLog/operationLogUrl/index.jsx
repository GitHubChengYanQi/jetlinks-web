/**
 * 操作日志接口配置
 *
 * @author
 * @Date 2021-11-05 11:42:40
 */

export const operationLogAdd = {
  url: '/operationLog/add',
  method: 'POST',
  rowKey:'operationLogId'
};

export const operationLogEdit = {
  url: '/operationLog/edit',
  method: 'POST',
  rowKey:'operationLogId'
};

export const operationLogDelete = {
  url: '/operationLog/delete',
  method: 'POST',
  rowKey:'operationLogId'
};

export const operationLogDetail = {
  url: '/operationLog/detail',
  method: 'POST',
  rowKey:'operationLogId'
};

export const operationLogList = {
  url: '/log/list',
  method: 'POST',
  rowKey:'operationLogId'
};

