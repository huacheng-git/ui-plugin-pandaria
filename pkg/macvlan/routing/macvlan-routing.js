import { MACVLAN_PRODUCT_NAME } from '../config/macvlan-types';
import ListMacvlanResource from '../pages/index.vue';
import CreateMacvlanResource from '../pages/_resource/create.vue';

const routes = [
  {
    name:      `${ MACVLAN_PRODUCT_NAME }-c-cluster`,
    path:      '/c/:cluster/:product/macvlan',
    component: ListMacvlanResource
  },
  {
    name:      `${ MACVLAN_PRODUCT_NAME }-c-cluster-resource-create`,
    path:      `/c/:cluster/:product/macvlan/create`,
    component: CreateMacvlanResource,
  },
];

export default routes;
