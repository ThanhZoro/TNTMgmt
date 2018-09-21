import Vue from 'vue'
const trackingData = (state, getters, rootState) => {
  var trackingData = {};
  if (state.allTracking) {
    var userNameOwner = rootState.auth.userInfo ? rootState.auth.userInfo.profile.userName : null;
    var data = _.map(state.allTracking, (v) => {
      var channel = [];
      v.fromNowCreate = Vue.prototype.$moment.utc(v.createdAt).fromNow();
      v.fromNowUpdate = Vue.prototype.$moment.utc(v.updatedAt).fromNow();
      v.isOwner = userNameOwner == v.createdBy ? true : false;
      return v;
    });
    data = _.filter(data, (o) => { return !o.isDelete });
    trackingData.total = state.total;
    data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder == 1 ? 'desc' : 'asc']);
    trackingData.data = data;
  }
  return trackingData;
};

const filterData = (state, getters, rootState) => {
  if (state.advanceFilter && state.advanceFilter.showData) {
    var data = [];
    switch (state.advanceFilter.showData.field) {
      default:
    }
    return data;
  }
};
const remainFilters = (state, getters, rootState) => {
  return _.filter(state.advanceFilter.filters, (v) => {
    return !_.find(state.advanceFilter.choosenFilter, { field: v.field })
  })
};
export default {
  trackingData,
  filterData,
  remainFilters
};
