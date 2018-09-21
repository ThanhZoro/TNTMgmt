import Vue from 'vue';

const SHOW_HIDE_COLS = (state, messages) => {
  state.headers[messages.props] = !state.headers[messages.props];
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
const UPDATE_LIST_ASSIGNMENTPLAN = (state, messages) => {
  var data = _.find(state.assignmentPlan, function (v) { return v.id == messages.id });
  if (data) {
    Object.keys(data).forEach(function (key) {
      data[key] = messages[key];
    });

  } else {
    state.assignmentPlan.push(messages);
    state.total++;
  }
};
const SET_LIST_ASSIGNMENTPLAN  = (state, messages) => {
  state.assignmentPlan = messages.data;
  state.total = messages.total;
};
const SET_TRACKING = (state, messages) => {
  state.tracking = messages;
};
export default {
  SHOW_HIDE_COLS,
  UPDATE_LIST_ASSIGNMENTPLAN,
  SET_LIST_ASSIGNMENTPLAN,
  UPDATE_CHOOSEN_FILTER,
  SET_TRACKING
};
