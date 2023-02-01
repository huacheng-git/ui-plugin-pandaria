import { CoreStoreSpecifics, CoreStoreConfig } from '@shell/core/types';
import { MACVLAN_STORE } from '../../types';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const elementalFactory = (): CoreStoreSpecifics => {
  return {
    state() {
      return { macvlanList: [] };
    },

    getters: { ...getters },

    mutations: { ...mutations },

    actions: { ...actions },
  };
};
const config: CoreStoreConfig = { namespace: MACVLAN_STORE };

export default {
  specifics: elementalFactory(),
  config
};
