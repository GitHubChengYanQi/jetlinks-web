import { createStore } from 'ice';
import user from './models/userInfo';
import dataSource from './models/dataSource';

const store = createStore({ user,dataSource });

export default store;
