import Vue from 'vue';

const SHOW_HIDE_COLS = (state, messages) => {
  state.headers[messages.props] = !state.headers[messages.props];
};

const SET_LIST_SO_HEADER = (state, messages) => {
  state.soHeaderList = messages.data;
  state.total = messages.total;
};

const UPDATE_CHOOSEN_FILTER_SO_HEADER = (state, messages) => {
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

const UPDATE_LIST_SO_HEADER = (state, messages) => {
  var data = _.find(state.soHeaderList, function (v) { return v.id == messages.soHeaderView.id });
  if (data) {
    Object.keys(data).forEach(function (key) {
      data[key] = messages.soHeaderView[key];
    });
  } else {
    state.soHeaderList.push(messages.soHeaderView);
    state.total++;
  }
};

const UPDATE_LIST_LEADS = (state, messages) => {
  state.listLeadsInHeader = messages.data;
};

const SET_LIST_TEAM = (state, messages) => {
  state.team = messages.data;
};

export default {
  SHOW_HIDE_COLS,
  SET_LIST_SO_HEADER,
  UPDATE_CHOOSEN_FILTER_SO_HEADER,
  UPDATE_FILTER_CHECKBOX,
  UPDATE_LIST_SO_HEADER,
  UPDATE_LIST_LEADS,
  SET_LIST_TEAM
};
