import {request} from '@/util/Request';
import {addressTree} from '@/Config/ApiUrl';

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
    async getCommonArea() {
      try {
        const res = await request(addressTree);
        dispatch.dataSource.update({area:res.data});
      } catch (e) {
        console.log(e);
      }
    },
  }),
};
