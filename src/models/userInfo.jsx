import {request} from '@/util/Request';
import {userInfo} from '@/Config/ApiUrl/system/user';
import {selfEnterpriseDetail} from '@/pages/Purshase/Supply/SupplyUrl';

export default {
  state: {},
  reducers: {
    update(prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },
  effects: (dispatch) => ({
    async getUserInfo() {
      try {
        const response = await request(userInfo);
        dispatch.user.update(response);
      } catch (e) {
        console.log(e);
      }
    },
  }),
};
