import { createStore } from 'ice';
import user from './models/userInfo';

const store = createStore({ user });

export default store;
