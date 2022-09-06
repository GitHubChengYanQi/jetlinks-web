import request from '@/utils/request';

export async function list(params?: any) {
  return request(`/jetlinks/customer-manager/_query`, {
    method: 'GET',
    params: params,
  });
}

export async function listNoPaging(params?: any) {
  return request(`/jetlinks/user/_query/no-paging`, {
    method: 'GET',
    params: params,
  });
}

export async function saveOrUpdate(params: any) {
  return request(`/jetlinks/device/newUser/add`, {
    method: 'POST',
    data: params,
  });
}

export async function userBind(params: any) {
  return request(`/jetlinks/user-bind/add`, {
    method: 'POST',
    data: params,
  });
}

export async function info(id: string) {
  return request(`/jetlinks/user/${id}`, {
    method: 'GET',
  });
}


export async function remove(id: string) {
  return request(`/jetlinks/user/${id}`, {
    method: 'DELETE',
  });
}


//=================================
export async function queryById(id: string) {
  return request(`/hsweb/user/${id}`, {
    method: 'GET',
  });
}


export async function add(params: any) {
  return request(`/hsweb/user`, {
    method: 'POST',
    data: params,
  });
}

export async function update(params: any) {
  return request(`/hsweb/user/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
