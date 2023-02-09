import { MACVLAN_PRODUCT_NAME } from './config/macvlan-types';

export function init($plugin, store) {
  const { virtualType, basicType } = $plugin.DSL(store, 'explorer');

  // app in sidebar
  // product({});

  virtualType({
    label:      'macvlanV2',
    // labelKey:   'nav.vlanSubnet.label',
    name:       'macvlanV2',
    group:      'cluster',
    namespaced: false,
    icon:       'globe',
    route:      {
      name:   'macvlan-c-cluster',
      params: {
        product:  'explor',
        resource: MACVLAN_PRODUCT_NAME
      }
    },
    exact: true
  });

  basicType(['macvlanV2'], 'cluster');
}
