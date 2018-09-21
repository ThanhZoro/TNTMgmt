import Vue from 'vue'
import utils from '@/utils/advanceFilter'
import commonData from "@/utils/common-data"

const surveyData = (state, getters, rootState) => {
  var surveyData = {};
  if (state.surveys) {
    var userNameOwner = rootState.auth.userInfo ? rootState.auth.userInfo.profile.userName : null;
    var data = _.map(state.surveys, (v) => {
      var channel = [];
      v.fromNowCreate = Vue.prototype.$moment.utc(v.createdAt).fromNow();
      v.fromNowUpdate = Vue.prototype.$moment.utc(v.updatedAt).fromNow();
      return v;
    });
    data = _.filter(data, (o) => { return !o.isDelete });
    surveyData.total = state.total;
    data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder == 1 ? 'desc' : 'asc']);
    surveyData.data = data;
  }
  return surveyData;
};

const filterData = (state, getters, rootState) => {
  if (state.advanceFilter && state.advanceFilter.showData) {
    var data = [];
    var valuePre = [];
    
    data = _.take(data, state.searchRequestFilter.size);
    return data;
  }
};

const remainFilters = (state, getters, rootState) => {
  return _.filter(state.advanceFilter.filters, (v) => {
    return !_.find(state.advanceFilter.choosenFilter, { field: v.field })
  })
};

export default {
  surveyData,
  filterData,
  remainFilters
};
