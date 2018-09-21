import Vue from 'vue'
const SHOW_HIDE_COLS = (state, messages) => {
  state.headers[messages.props] = !state.headers[messages.props];
};
const SET_LIST_TRACKING = (state, messages) => {
  state.allTracking = messages.data;
  state.total = messages.total;
};
const DELETE_TRACKING = (state, messages) => {
  state.allTracking = _.filter(state.allTracking, (o) => { return _.indexOf(messages.data, o.id) == -1 });
};
const UPDATE_CHOOSEN_FILTER = (state, messages) => {
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
const SET_SEARCH = (state, messages) => {
  state.searchRequest[messages.type] = messages.val;
};
const UPDATE_LIST_TRACKING = (state, messages) => {
  var filter = _.findIndex(state.allTracking, { id: messages.id });
  if (filter > -1) {
    Vue.set(state.allTracking, filter, messages)
  } else {
    state.allTracking.push(messages)
  }
};
const SET_GAMAPPING = (state, messages) => {
  state.GAMapping = messages;
};
export default {
  SHOW_HIDE_COLS,
  SET_LIST_TRACKING,
  DELETE_TRACKING,
  UPDATE_CHOOSEN_FILTER,
  SET_SEARCH,
  UPDATE_LIST_TRACKING,
  SET_GAMAPPING
};
