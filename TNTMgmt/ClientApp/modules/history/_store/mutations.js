import Vue from 'vue'
const SET_DATA = (state, messages) => {
  state.data = state.checkList.length ? messages.data : null;
  state.searchRequest.total = messages.total;
};
const SET_CHECKLIST = (state, messages) => {
    state.checkList = messages;
};
export default {
    SET_DATA,
    SET_CHECKLIST
};
