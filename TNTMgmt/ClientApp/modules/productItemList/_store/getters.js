import Vue from 'vue'
import utils from '@/utils/advanceFilter'
import commonData from "@/utils/common-data"
import commonFunc from "@/utils/common-func"

const productItem = (state, getters, rootState) => {
  var productItem = {};
  if (state.productItemList) {
    var data = _.map(state.productItemList, function (v) {
        if (state.productCategoryList) {
          var categoryData = _.find(state.productCategoryList, function (o) {
            return o.id == v.productCategoryId;
          });
          v.productCategoryData = categoryData ? categoryData.categoryCode + " | " + categoryData.name : null;
        }
      v.fromNowCreate = Vue.prototype.$moment.utc(v.createdAt).fromNow();
      v.fromNowUpdate = Vue.prototype.$moment.utc(v.updatedAt).fromNow();
      return v;
    });
    productItem.total = state.total;
    data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder == 1 ? 'desc' : 'asc']);
    productItem.data = data;
  }
  return productItem;
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
          data.push({ id: value.value, name: value.value });
        });
        break;
      case "productCategoryId":
        valuePre = _.filter(state.productCategoryListFilter, function (v) {
          if (state.searchRequestFilter.desFilter != '') {
            return ((v.name && v.name.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1) ||
              (v.categoryCode && v.categoryCode.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1));
          } else {
            return v;
          }
        });
        valuePre.forEach(function (value) {
          data.push({ id: value.id, name: value.categoryCode + ' | ' + value.name });
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
  productItem,
  filterData,
  remainFilters,
};
