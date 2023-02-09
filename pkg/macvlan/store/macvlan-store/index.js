import { MACVLAN_STORE } from '../../types';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const elementalFactory = () => {
  return {
    state() {
      return { macvlanList: [], macvlan: {} };
    },

    getters: { ...getters },

    mutations: { ...mutations },

    actions: { ...actions },
  };
};
const config = { namespace: MACVLAN_STORE };

export default {
  specifics: elementalFactory(),
  config
};
