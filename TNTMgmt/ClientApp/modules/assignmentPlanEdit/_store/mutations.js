const SET_LIST_ASSIGNMENTPLAN  = (state, messages) => {
  state.assignmentPlan = messages;
};
const SET_TRACKING = (state, messages) => {
  state.tracking = messages;
};
const SET_SEARCH = (state, messages) => {
  state.searchRequest.description = messages;
};
const SET_USER_IDS = (state, messages) => {
  state.user.ids = messages;
};
const SET_LIST_TEAM = (state, messages) => {
  state.team = messages.data;
};
export default {
  SET_LIST_ASSIGNMENTPLAN,
  SET_TRACKING,
  SET_SEARCH,
  SET_USER_IDS,
  SET_LIST_TEAM
};
