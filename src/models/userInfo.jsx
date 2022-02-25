import {request} from '@/util/Request';
import {userInfo} from '@/Config/ApiUrl/system/user';
import {customerDetail} from '@/pages/Crm/customer/CustomerUrl';

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
        let res = await request(customerDetail);
        if (!res) {
          res = {};
        }
        dispatch.user.update({...response, abbreviation: res.abbreviation, customerName: res.customerName,customerId:res.customerId});
      } catch (e) {
        console.log(e);
      }
    },
  }),
};
