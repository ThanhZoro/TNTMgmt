import Vue from 'vue'
import commonData from "@/utils/common-data"

const assignmentPlanData = (state, getters, rootState) => {
  var assignmentPlanData = {};
  if (state.assignmentPlan) {
    var data = _.map(state.assignmentPlan, (v) => {
      v.fromNowCreate = Vue.prototype.$moment.utc(v.createdAt).fromNow();
      v.fromNowUpdate = Vue.prototype.$moment.utc(v.updatedAt).fromNow();
      var tracking = _.find(state.tracking, { 'id': v.trackingId });
      v.trackingName = tracking ? tracking.name : '';
      _.map(v.detail, (o) => {
        var user = _.find(rootState.common.users, { 'id': o.userId });
        o.userName = user ? user.userName : '';
        return o;
      });
      return v;
    });
    assignmentPlanData.total = state.total;
    data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder == 1 ? 'desc' : 'asc']);
    assignmentPlanData.data = data;
  }
  return assignmentPlanData;
};


const remainFilters = (state, getters, rootState) => {
  return _.filter(state.advanceFilter.filters, (v) => {
    return !_.find(state.advanceFilter.choosenFilter, { field: v.field })
  })
};

const filterData = (state, getters, rootState) => {
  if (state.advanceFilter && state.advanceFilter.showData) {
    var data = [];
    switch (state.advanceFilter.showData.field) {
      case "trackingId":
        data = _.filter(state.tracking, (o) => {
          return state.advanceFilter.showData.searchText ?
            o.name.toLowerCase().indexOf(state.advanceFilter.showData.searchText.toLowerCase()) > -1 :
            o
        })
        break;
      default:
    }
    data = _.take(_.drop(data, 0), 10);
    return data;
  }
};

export default {
  assignmentPlanData,
  remainFilters,
  filterData
};
