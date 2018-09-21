import Vue from 'vue'
import utils from '@/utils/advanceFilter'
const remainFilters = (state, getters, rootState) => {
  return _.filter(state.advanceFilter.filters, (v) => {
    return !_.find(state.advanceFilter.choosenFilter, { field: v.field })
  })
};

export default {
  remainFilters
};
