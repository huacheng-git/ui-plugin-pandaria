<script>
import { mapGetters } from 'vuex';
import { SCHEMA } from '@shell/config/types';
import ResourceTable from '@shell/components/ResourceTable';
import Masthead from '@shell/components/ResourceList/Masthead';
import { ROWS_PER_PAGE } from '@shell/store/prefs';
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
    const perPage = this.getPerPage();

    return {
      resource: MACVLAN_PRODUCT_NAME,
      schema,
      perPage,
    };
  },
  fetch() {
    const { currentCluster, namespaces, perPage } = this;

    this.$store.dispatch('macvlan/loadMacvlans', {
      cluster: currentCluster?.id,
      params:  { labelSelector: namespaces, limit: perPage }
    });
  },

  computed: {
    ...mapGetters(['currentCluster']),
    loading() {
      return !this.currentCluster;
    },
    namespaces() {
      return this.$store.getters['activeNamespaceCache'];
    },
    rows() {
      return this.$store.getters['macvlan/macvlanList'].map((item) => {
        item._key = item.metadata.name;
        item.nameDisplay = item.metadata.name;
        item.type = MACVLAN_PRODUCT_NAME;
        item.availableActions = [{
          action:  'goToEdit',
          enabled: true,
          icon:    'icon icon-edit',
          label:   this.t('action.edit'),
        }, {
          action:     'promptRemove',
          altAction:  'remove',
          bulkAction: 'promptRemove',
          bulkable:   true,
          enabled:    true,
          icon:       'icon icon-trash',
          label:      this.t('action.remove'),
          weight:     -10
        }];
        item.promptRemove = this.promptRemove(item);
        item.goToEdit = this.goToEdit(item);
        item.remove = this.remove(item);
        item.currentRoute = this.currentRoute;
        item.currentRouter = this.currentRouter;

        return item;
      });
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
    currentRoute() {
      return window.$nuxt.$route;
    },
    currentRouter() {
      return window.$nuxt.$router;
    },
    createMacvlan() {
      this.$router.push({ name: `${ MACVLAN_PRODUCT_NAME }-c-cluster-resource-create` });
    },
    promptRemove(row) {
      return (resources) => {
        if ( !resources ) {
          resources = row;
        }

        const inStore = this.$store.getters['currentProduct'].inStore;

        this.$store.dispatch(`${ inStore }/promptRemove`, resources);
      };
    },
    getPerPage() {
      // perPage can not change while the list is displayed
      let out = this.rowsPerPage || 0;

      if ( out <= 0 ) {
        out = parseInt(this.$store.getters['prefs/get'](ROWS_PER_PAGE), 10) || 0;
      }

      // This should ideally never happen, but the preference value could be invalid, so return something...
      if ( out <= 0 ) {
        out = 10;
      }

      return out;
    },
    getLabelSelector() {

    },
    goToEdit(row) {
      return (resource) => {
        if ( !resource ) {
          resource = row;
        }

        this.$router.push({
          name:   `${ MACVLAN_PRODUCT_NAME }-c-cluster-resource-edit`,
          params: { id: resource._key },
          query:  { mode: 'edit' }
        });
      };
    },
    remove(row) {
      return (resource) => {
        if ( !resource ) {
          resource = row;
        }

        this.$store.dispatch('macvlan/removeMacvlan', { cluster: this.currentCluster.id, resource });
      };
    }
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
