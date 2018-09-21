import Vue from 'vue';

const SHOW_HIDE_COLS = (state, messages) => {
  state.headers[messages.props] = !state.headers[messages.props];
};

const SET_LIST_PRODUCT_CATEGORY = (state, messages) => {
  state.productCategory = messages.data;
  state.total = messages.total;
};

const UPDATE_CHOOSEN_FILTER_PROD_CATE = (state, messages) => {
  state.advanceFilter.show = false;
  if (messages.isDelete) {
    state.advanceFilter.choosenFilter = _.filter(state.advanceFilter.choosenFilter, (v) => { return v.field != messages.field })
  } else {
    var filter = _.findIndex(state.advanceFilter.choosenFilter, { field: messages.field });
    if (filter > -1) {
      Vue.set(state.advanceFilter.choosenFilter, filter, messages)
    } else {
      state.advanceFilter.choosenFilter.push(messages)
    }
  }
};

const UPDATE_FILTER_CHECKBOX = (state, messages) => {
  state.searchRequestFilter.desFilter = messages.data;
};

const UPDATE_LIST_PRODUCT_CATEGORY = (state, messages) => {
  var data = _.find(state.productCategory, function (v) { return v.id == messages.id });
  if (data) {
    Object.keys(data).forEach(function (key) {
      data[key] = messages[key];
    });
  } else {
    state.productCategory.push(messages);
    state.total++;
  }
};

export default {
  SHOW_HIDE_COLS,
  SET_LIST_PRODUCT_CATEGORY,
  UPDATE_CHOOSEN_FILTER_PROD_CATE,
  UPDATE_FILTER_CHECKBOX,
  UPDATE_LIST_PRODUCT_CATEGORY,
};
