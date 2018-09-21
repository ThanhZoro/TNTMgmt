import Vue from 'vue';

const SHOW_HIDE_COLS = (state, messages) => {
  state.headers[messages.props] = !state.headers[messages.props];
};

const SET_LIST_SO_DETAIL = (state, messages) => {
  state.soDetailList = messages.data;
  state.total = messages.total;
};

const UPDATE_CHOOSEN_FILTER_SO_DETAIL = (state, messages) => {
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

const UPDATE_LIST_SO_DETAIL = (state, messages) => {
  var data = _.find(state.soDetailList, function (v) { return v.id == messages.id });
  if (data) {
    Object.keys(data).forEach(function (key) {
      data[key] = messages[key];
    });
  } else {
    state.soDetailList.push(messages);
    state.total++;
  }
};

export default {
  SHOW_HIDE_COLS,
  SET_LIST_SO_DETAIL,
  UPDATE_CHOOSEN_FILTER_SO_DETAIL,
  UPDATE_FILTER_CHECKBOX,
  UPDATE_LIST_SO_DETAIL,
};
