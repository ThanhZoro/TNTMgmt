import Vue from 'vue';

const SHOW_HIDE_COLS = (state, messages) => {
  state.headers[messages.props] = !state.headers[messages.props];
};

const SET_LIST_PRODUCT_ITEM = (state, messages) => {
  state.productItemList = messages.data;
  state.total = messages.total;
};

const SET_LIST_PRODUCT_CATEGORY = (state, messages) => {
  state.productCategoryList = messages.data;
  state.productCategoryListFilter = messages.data;
};

const SET_LIST_PRODUCT_CATEGORY_FILTER = (state, messages) => {
  state.productCategoryListFilter = messages.data;
};

const UPDATE_CHOOSEN_FILTER_PROD_ITEM = (state, messages) => {
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

const UPDATE_LIST_PRODUCT_ITEM = (state, messages) => {
  var data = _.find(state.productItemList, function (v) { return v.id == messages.id });
  if (data) {
    Object.keys(data).forEach(function (key) {
      data[key] = messages[key];
    });
  } else {
    state.productItemList.push(messages);
    state.total++;
  }
};

export default {
  SHOW_HIDE_COLS,
  SET_LIST_PRODUCT_ITEM,
  SET_LIST_PRODUCT_CATEGORY,
  SET_LIST_PRODUCT_CATEGORY_FILTER,
  UPDATE_CHOOSEN_FILTER_PROD_ITEM,
  UPDATE_FILTER_CHECKBOX,
  UPDATE_LIST_PRODUCT_ITEM,
};
