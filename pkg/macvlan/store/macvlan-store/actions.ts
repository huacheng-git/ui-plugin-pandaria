export default {
  apiList({ dispatch }: any, { commitVal, url = null, headers = null }: any = {}) {
    return dispatch('rancher/request', { url, headers: headers || undefined }, { root: true });
  },
  loadMacvlans({ dispatch, commit }: any, cluster: string) {
    dispatch('apiList', { url: `/k8s/clusters/${ cluster }/apis/macvlan.cluster.cattle.io/v1/namespaces/kube-system/macvlansubnets?limit=-1` } ).then((res: any) => {
      commit('setMacvlanList', res.items || []);
    });
  },
  createMacvlan(store: any, { cluster, params }: any) {
    const { dispatch }: any = this;

    dispatch('management/request', {
      url:    `/k8s/clusters/${ cluster }/apis/macvlan.cluster.cattle.io/v1/namespaces/kube-system/macvlansubnets?limit=-1`,
      method: 'POST',
      data:   params,
    });
  },
};
