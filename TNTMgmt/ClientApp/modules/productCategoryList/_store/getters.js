import Vue from 'vue'
import utils from '@/utils/advanceFilter'
import commonData from "@/utils/common-data"
import commonFunc from "@/utils/common-func"

const productCategory = (state, getters, rootState) => {
  var productCategory = {};
  if (state.productCategory) {
    var data = _.map(state.productCategory, function (v) {
      v.fromNowCreate = Vue.prototype.$moment.utc(v.createdAt).fromNow();
      v.fromNowUpdate = Vue.prototype.$moment.utc(v.updatedAt).fromNow();
      return v;
    });
    productCategory.total = state.total;
    data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder == 1 ? 'desc' : 'asc']);
    productCategory.data = data;
  }
  return productCategory;
};

const filterData = (state, getters, rootState) => {
  if (state.advanceFilter && state.advanceFilter.showData) {
    var data = [];
    var valuePre = [];
    switch (state.advanceFilter.showData.field) {
      case "status":
        valuePre = _.filter(commonData.statusProduct, function (o) {
          return o;
        });
        valuePre.forEach(function (value) {
          data.push({ id: value.value, name: "status" });
        });
        break;
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
  productCategory,
  filterData,
  remainFilters,
};
