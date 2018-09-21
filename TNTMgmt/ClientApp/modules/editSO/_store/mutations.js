const SET_SO = (state, messages) => {
  state.soData = messages;
}

const SET_LIST_LEAD_BUYERS = (state, messages) => {
  state.leadByers = messages.data;
  state.total = messages.total;
};

const SET_LIST_TEAM = (state, messages) => {
  state.team = messages.data;
};

export default {
  SET_SO,
  SET_LIST_LEAD_BUYERS,
  SET_LIST_TEAM
};
