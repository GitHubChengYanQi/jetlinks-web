import { Effect } from 'dva';
import { Reducer } from 'react';
import apis from '@/services';

export interface TenantModelState {
  result: any;
}

export interface TenantModelType {
  namespace: string;
  state: TenantModelState;
  effects: {
    query: Effect;
    queryById: Effect;
    insert: Effect;
    remove: Effect;
  };
  reducers: {
    save: Reducer<any, any>;
  }
}

const UsersModel: TenantModelType = {
  namespace: 'tenant',
  state: {
    result: {},
  },
  effects: {
    *query({ payload, callback }, { call, put }) {
      const response = yield call(apis.tenant.list, payload);
      yield put({
        type: 'save',
        payload: response.result,
      });
    },
    *queryById({ payload, callback }, { call }) {
      const response = yield call(apis.tenant.list, payload);
      callback(response);
    },
    *insert({ payload, callback }, { call }) {
      const response = yield call(apis.tenant.saveOrUpdate, payload);
      callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(apis.tenant.remove, payload);
      callback(response);
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        result: { ...action.payload },
      }
    }
  }
};

export default UsersModel;
