import {request} from '@/util/Request';
import {userInfo} from '@/Config/ApiUrl/system/user';

export default {
  state: {
    info: {}
  },
  reducers: {
    update (prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },
  effects:(dispatch) => ({
    async getUserInfo () {
      const response = await request(userInfo);
      dispatch.user.update(response);
    },
  }),
};
