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
      try {
        const response = await request(userInfo);
        console.log(response)
        dispatch.user.update(response);
      }catch (e) {
        console.log(e);
      }
    },
  }),
};
