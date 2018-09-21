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
const UPDATE_FILTER_CHECKBOX = (state, messages) => {
  state.searchRequestFilter.desFilter = messages.data;
};
const SET_LIST_TEAM = (state, messages) => {
  state.team = messages.data;
}
export default {
  SHOW_HIDE_COLS,
  UPDATE_CHOOSEN_FILTER,
  UPDATE_FILTER_CHECKBOX,
  SET_LIST_TEAM
};
