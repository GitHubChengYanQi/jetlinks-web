import request from "@/utils/request";

export async function accountAdd(params: any) {
  return request('/jetlinks/customer-manager/add', {
    method: 'POST',
    data: params,
  });
}
