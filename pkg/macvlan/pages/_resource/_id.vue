<script>
import Loading from '@shell/components/Loading';
import LabeledInput from '@components/Form/LabeledInput/LabeledInput.vue';
import LabeledSelect from '@shell/components/form/LabeledSelect.vue';
import { SCHEMA, MANAGEMENT } from '@shell/config/types';
import Masthead from '@shell/components/ResourceDetail/Masthead';
import Tabbed from '@shell/components/Tabbed';
import Tab from '@shell/components/Tabbed/Tab';
import AsyncButton from '@shell/components/AsyncButton';
import { mapGetters } from 'vuex';
import { MACVLAN_PRODUCT_NAME } from '../../config/macvlan-types';

const schema = {
  id:         MACVLAN_PRODUCT_NAME,
  type:       SCHEMA,
  attributes: {
    kind:       MACVLAN_PRODUCT_NAME,
    namespaced: false
  },
  metadata: { name: 'macvlan Create' },
};

export default {
  name:       'MacvlanResourceDetails',
  components: {
    Loading, LabeledInput, Masthead, Tabbed, Tab, AsyncButton, LabeledSelect,
  },
  mixins: [],

  async fetch() {
    const config = await this.$store.dispatch('macvlan/loadMacvlan', { cluster: this.currentCluster.id, resource: this.$route.params?.id });

    this.$set(this, 'config', config);
  },

  data() {
    return {
      resource:    MACVLAN_PRODUCT_NAME,
      config:      {},
      mode:        'edit',
      schema,
      tabErrors:   {},
      errors:      [],
      modeOptions: [{
        label: 'bridge',
        value: 'bridge',
      }],
      vlan: '',
    };
  },

  computed: {
    ...mapGetters(['currentCluster']),
    projectOptions() {
      const out = [{
        label: 'All Projects',
        value: ''
      }];

      this.$store.getters['management/all'](
        MANAGEMENT.PROJECT
      ).forEach((obj) => {
        out.push({
          label: obj.nameDisplay,
          value: obj.id
        });
      });

      return out;
    },
    mastheadData() {
      const {
        creationTimestamp, parentNameOverride, parentLocationOverride, detailPageHeaderActionOverride
      } = this;

      return {
        ...this.config,
        creationTimestamp,
        parentNameOverride,
        parentLocationOverride,
        detailPageHeaderActionOverride
      };
    },
    creationTimestamp() {
      return this.config?.metadata?.creationTimestamp;
    },
    parentNameOverride() {
      return MACVLAN_PRODUCT_NAME;
    },
    parentLocationOverride() {
      return {
        name:   'macvlan-c-cluster',
        params: {
          cluster:  this.currentCluster?.id,
          resource: this.resource,
          product:  'explorer',
        }
      };
    }
  },

  methods: {
    save(btnCb) {
      this.$store.dispatch('macvlan/updateMacvlan', {
        cluster:  this.currentCluster.id,
        resource: this.config
      }).then((res) => {
        btnCb(true);
        this.cancel();
      });
    },
    cancel() {
      this.$router.push({ name: `${ MACVLAN_PRODUCT_NAME }-c-cluster` });
    },
    detailPageHeaderActionOverride() {
      return this.$route.params?.id;
    }
  }
};
</script>

<template>
  <Loading
    v-if="$fetchState.pending"
    :delayed="true"
  />
  <div v-else>
    <Masthead
      :schema="schema"
      :resource="resource"
      :mode="mode"
      :value="mastheadData"
    >
    </Masthead>
    <div class="row mb-20">
      <div class="col span-3">
        <LabeledInput
          v-model="config.metadata.name"
          required
          label-key="generic.name"
          placeholder-key="nameNsDescription.name.placeholder"
          :mode="mode"
          :disabled="true"
        />
      </div>
    </div>
    <Tabbed
      :side-tabs="true"
      default-tab="general"
    >
      <Tab
        name="general"
        :label="t('macvlan.tabs.general')"
        :weight="99"
        :error="tabErrors.general"
      >
        <div class="row mb-20">
          <div class="col span-6">
            <LabeledInput
              v-model="config.spec.master"
              required
              label-key="macvlan.master.label"
              placeholder-key="macvlan.master.placeholder"
              :mode="mode"
              :disabled="true"
            />
          </div>
          <div class="col span-6">
            <LabeledInput
              v-model="vlan"
              label-key="macvlan.vlan.label"
              placeholder-key="macvlan.vlan.placeholder"
              :mode="mode"
              :disabled="true"
              @input="$set(config.spec, 'vlan', Number($event));"
            />
          </div>
        </div>

        <div class="row mb-20">
          <div class="col span-6">
            <LabeledInput
              v-model="config.spec.cidr"
              required
              label-key="macvlan.cidr.label"
              placeholder-key="macvlan.cidr.placeholder"
              :mode="mode"
              :disabled="true"
            />
          </div>
          <div class="col span-6">
            <LabeledSelect
              v-model="config.spec.mode"
              :mode="mode"
              required
              label-key="macvlan.mode.label"
              :options="modeOptions"
              option-label="label"
              :disabled="true"
              @input="$emit('updateVersion', $event)"
            />
          </div>
        </div>

        <div class="row mb-20">
          <div class="col span-6">
            <LabeledInput
              v-model="config.spec.gateway"
              label-key="macvlan.gateway.label"
              placeholder-key="macvlan.gateway.placeholder"
              :mode="mode"
              :disabled="true"
            />
          </div>
          <div class="col span-6">
            <LabeledSelect
              v-model="config.metadata.labels.project"
              :mode="mode"
              required
              label-key="macvlan.project.label"
              :options="projectOptions"
              option-label="label"
              :disabled="true"
              @input="$emit('updateVersion', $event)"
            />
          </div>
        </div>

        <div class="row mb-20">
          <div class="col span-6">
            <LabeledInput
              v-model="config.spec.ipDelayReuse"
              label-key="macvlan.ipReuse.label"
              placeholder-key="macvlan.ipReuse.placeholder"
              :mode="mode"
              :disabled="true"
            />
          </div>
        </div>
      </Tab>
      <Tab
        name="advanced"
        :label="t('macvlan.tabs.advanced')"
        :weight="98"
        :error="tabErrors.advanced"
      >
      </Tab>
    </Tabbed>
    <div class="controls-container pt-20">
      <button class="btn role-secondary mr-10" @click="cancel">
        {{ t('generic.cancel') }}
      </button>
      <AsyncButton
        :disabled="errors.length > 0"
        @click="save"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
    $spacer: 10px;

    .controls-container {
      display: flex;
      justify-content: right;
      padding-top: $spacer;

      border-top: var(--header-border-size) solid var(--header-border);
    }
</style>
