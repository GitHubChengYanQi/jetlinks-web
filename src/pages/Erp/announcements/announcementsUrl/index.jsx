/**
 * 注意事项接口配置
 *
 * @author song
 * @Date 2022-05-27 13:45:48
 */

export const announcementsAdd = {
  url: '/announcements/add',
  method: 'POST',
  rowKey:'noticeId'
};

export const announcementsEdit = {
  url: '/announcements/edit',
  method: 'POST',
  rowKey:'noticeId'
};

export const announcementsDelete = {
  url: '/announcements/delete',
  method: 'POST',
  rowKey:'noticeId'
};

export const announcementsDetail = {
  url: '/announcements/detail',
  method: 'POST',
  rowKey:'noticeId'
};

export const announcementsList = {
  url: '/announcements/list',
  method: 'POST',
  rowKey:'noticeId'
};

