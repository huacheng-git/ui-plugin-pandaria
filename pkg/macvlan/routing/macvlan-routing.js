import { MACVLAN_PRODUCT_NAME } from '../config/macvlan-types';
import ListMacvlanResource from '../pages/index.vue';
import CreateMacvlanResource from '../pages/_resource/create.vue';
import MacvlanResourceDetails from '../pages/_resource/_id.vue';

const routes = [
  {
    name:      `${ MACVLAN_PRODUCT_NAME }-c-cluster`,
    path:      '/:product/c/:cluster/:resource',
    component: ListMacvlanResource
  },
  {
    name:      `${ MACVLAN_PRODUCT_NAME }-c-cluster-resource-create`,
    path:      `/:product/c/:cluster/:resource/create`,
    component: CreateMacvlanResource,
  },
  {
    name:      `${ MACVLAN_PRODUCT_NAME }-c-cluster-resource-edit`,
    path:      `/:product/c/:cluster/:resource/:id`,
    component: MacvlanResourceDetails,
  },
];

export default routes;
