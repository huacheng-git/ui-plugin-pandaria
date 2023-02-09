import { removeObject } from '@shell/utils/array.ts';

export default {
  setMacvlanList(state, val) {
    state.macvlanList = val;
  },
  setMacvlan(state, val) {
    state.macvlan = val;
  },
  removeMacvlan(state, val) {
    removeObject(state.macvlanList, val);
  },
};
