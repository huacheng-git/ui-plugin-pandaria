<script>
import { mapGetters } from 'vuex';
import { SCHEMA } from '@shell/config/types';
import ResourceTable from '@shell/components/ResourceTable';
import Masthead from '@shell/components/ResourceList/Masthead';
import { MACVLAN_PRODUCT_NAME } from '../config/macvlan-types';

const schema = {
  id:         'macvlan',
  type:       SCHEMA,
  attributes: {
    kind:       'Macvlan',
    namespaced: false
  },
  metadata: { name: 'macvlan' },
};

export default {
  name:       'ListProjectNamespace',
  components: { ResourceTable, Masthead },
  data() {
    return {
      resource: MACVLAN_PRODUCT_NAME,
      schema
    };
  },
  fetch() {
    this.$store.dispatch('macvlan/loadMacvlans', this.currentCluster.id);
  },
  computed: {
    ...mapGetters(['currentCluster']),
    loading() {
      return !this.currentCluster;
    },
    rows() {
      return this.$store.getters['macvlan/macvlanList'];
    },
    headers() {
      return [
        {
          name:      'name',
          label:     'Name',
          value:     'name',
          width:     120,
          formatter: 'MacvlanName'
        },
        {
          name:      'project',
          label:     'Project',
          value:     'project',
          width:     120,
          formatter: 'MacvlanProject'
        },
        {
          name:      'master',
          label:     'Master',
          sort:      'master',
          value:     'spec.master',
          width:     120
        },
        {
          name:      'vlan',
          label:     'VLAN',
          value:     'spec.vlan',
          width:     120
        },
        {
          name:      'gateway',
          label:     'GATEWAY',
          value:     'spec.gateway',
          width:     120
        },
        {
          name:      'cidr',
          label:     'CIDR',
          value:     'spec.cidr',
          width:     120
        },
        {
          name:      'ipRange',
          label:     'IP Range',
          value:     'spec.ranges',
          width:     120
        },
        {
          name:      'customRoute',
          label:     'Custom Route',
          value:     'spec.routes',
          width:     120
        },
      ];
    },
  },
  methods: {
    createMacvlan() {
      this.$router.push({ name: `${ MACVLAN_PRODUCT_NAME }-c-cluster-resource-create` });
    },
  },
};
</script>
<template>
  <div>
    <Masthead
      :schema="schema"
      :resource="resource"
    >
      <template v-slot:createButton>
        <button
          class="btn role-primary"
          @click="createMacvlan"
        >
          {{ t('generic.create') }}
        </button>
      </template>
    </Masthead>
    <ResourceTable
      v-bind="$attrs"
      :headers="headers"
      :rows="rows"
      :groupable="false"
      :schema="schema"
      key-field="_key"
      :loading="loading"
      v-on="$listeners"
    />
  </div>
</template>
