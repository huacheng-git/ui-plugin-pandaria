export function init($plugin, store) {
  // const { product } = $plugin.DSL(store, $plugin.name);
  const { virtualType, basicType } = $plugin.DSL(store, 'explorer');

  virtualType({
    label:      'macvlan',
    labelKey:   'nav.vlanSubnet.label',
    name:       'macvlan-subnet',
    group:      'cluster',
    namespaced: false,
    icon:       'globe',
    route:      { name: 'macvlan-c-cluster' },
    exact:      true
  });
  basicType(['macvlan-subnet'], 'cluster');
}
