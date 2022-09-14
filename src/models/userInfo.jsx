import {request} from '@/util/Request';
import {userInfo} from '@/Config/ApiUrl/system/user';
import {currentUserInfo} from '@/pages/Member/apiUrl';

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
        const currentUser = await request(currentUserInfo);
        dispatch.user.update({...response.data,info:currentUser.data});
      } catch (e) {
        console.log(e);
      }
    },
  }),
};
