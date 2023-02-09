export default {
  apiList({ dispatch }, { commitVal, url = null, headers = null } = {}) {
    return dispatch('rancher/request', { url, headers: headers || undefined }, { root: true });
  },
  loadMacvlans({ dispatch, commit }, { cluster, namespaces }) {
    dispatch('apiList', { url: `/k8s/clusters/${ cluster }/apis/macvlan.cluster.cattle.io/v1/namespaces/kube-system/macvlansubnets?limit=-1` } ).then((res) => {
      commit('setMacvlanList', res.items || []);
    });
  },
  loadMacvlan({ dispatch, commit }, { cluster, resource }) {
    return dispatch('apiList', { url: `/k8s/clusters/${ cluster }/apis/macvlan.cluster.cattle.io/v1/namespaces/kube-system/macvlansubnets/${ resource }` } ).then((res) => {
      commit('setMacvlan', res || {});

      return res;
    });
  },
  createMacvlan(store, { cluster, params }) {
    const { dispatch } = this;

    dispatch('management/request', {
      url:    `/k8s/clusters/${ cluster }/apis/macvlan.cluster.cattle.io/v1/namespaces/kube-system/macvlansubnets?limit=-1`,
      method: 'POST',
      data:   params,
    });
  },
  updateMacvlan(store, { cluster, resource }) {
    const { dispatch } = this;

    dispatch('management/request', {
      url:    `/k8s/clusters/${ cluster }/apis/macvlan.cluster.cattle.io/v1/namespaces/kube-system/macvlansubnets/${ resource.metadata.name }`,
      method: 'PUT',
      data:   resource,
    });
  },
  removeMacvlan({ commit }, { cluster, resource }) {
    const { dispatch } = this;

    dispatch('management/request', {
      url:    `/k8s/clusters/${ cluster }/apis/macvlan.cluster.cattle.io/v1/namespaces/kube-system/macvlansubnets/${ resource.metadata.name }`,
      method: 'DELETE',
    }).then(() => {
      commit('removeMacvlan', resource);
    });
  }
};
