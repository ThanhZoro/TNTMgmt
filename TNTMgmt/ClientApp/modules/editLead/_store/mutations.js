const SET_LEAD = (state, messages) => {
  state.lead = messages;
}
const SET_LIST_TEAM = (state, messages) => {
  state.team = messages.data;
};
export default {
  SET_LEAD,
  SET_LIST_TEAM
};
