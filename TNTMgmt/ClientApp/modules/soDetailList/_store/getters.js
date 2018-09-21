import Vue from 'vue'
import utils from '@/utils/advanceFilter'
import commonData from "@/utils/common-data"
import commonFunc from "@/utils/common-func"

const soDetailList = (state, getters, rootState) => {
  var soDetailList = {};
  if (state.soDetailList) {
    var data = _.map(state.soDetailList, function (v) {
      v.noteContent = v.note ? commonFunc.shorten(v.note, 50) : '';
      v.amount = v.price * v.quantity;
      v.fromNowCreate = Vue.prototype.$moment.utc(v.createdAt).fromNow();
      v.fromNowUpdate = Vue.prototype.$moment.utc(v.updatedAt).fromNow();
      return v;
    });
    soDetailList.total = state.total;
    data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder == 1 ? 'desc' : 'asc']);
    soDetailList.data = data;
  }
  return soDetailList;
};

const filterData = (state, getters, rootState) => {
  if (state.advanceFilter && state.advanceFilter.showData) {
    var data = [];
    var valuePre = [];
    switch (state.advanceFilter.showData.field) {
      default:
    }
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
  soDetailList,
  filterData,
  remainFilters,
};
