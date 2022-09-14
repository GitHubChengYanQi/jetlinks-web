import {request} from '@/util/Request';
import {addressTree} from '@/Config/ApiUrl';
import {deviceClassifyTree} from '@/pages/equipment/Grouping/url';

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
        dispatch.dataSource.update({area: res.data});
      } catch (e) {
        console.log(e);
      }
    },
    async getDeviceClass() {
      try {
        const res = await request(deviceClassifyTree);
        dispatch.dataSource.update({deviceClass: res.data});
      } catch (e) {
        console.log(e);
      }
    },
  }),
};
