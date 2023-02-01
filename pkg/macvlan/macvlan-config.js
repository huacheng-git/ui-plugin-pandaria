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
    route:      { name: 'macvlan-c-cluster' },
    exact:      true
  });

  basicType(['macvlanV2'], 'cluster');
}
