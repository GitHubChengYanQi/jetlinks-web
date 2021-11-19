/**
 * 质检任务接口配置
 *
 * @author
 * @Date 2021-11-16 09:54:41
 */

export const qualityTaskAdd = {
  url: '/qualityTask/add',
  method: 'POST',
  rowKey:'qualityTaskId'
};

export const qualityTaskEdit = {
  url: '/qualityTask/edit',
  method: 'POST',
  rowKey:'qualityTaskId'
};

export const qualityTaskDelete = {
  url: '/qualityTask/delete',
  method: 'POST',
  rowKey:'qualityTaskId'
};

export const qualityTaskDetail = {
  url: '/qualityTask/detail',
  method: 'POST',
  rowKey:'qualityTaskId'
};

export const qualityTaskList = {
  url: '/qualityTask/list',
  method: 'POST',
  rowKey:'qualityTaskId'
};

export const qualityTaskBackInkind = {
  url: '/qualityTask/backInkind',
  method: 'GET',
};


export const qualityTaskFormDetail = {
  url: '/qualityTask/formDetail',
  method: 'POST',
  rowKey:'qualityTaskId'
};

