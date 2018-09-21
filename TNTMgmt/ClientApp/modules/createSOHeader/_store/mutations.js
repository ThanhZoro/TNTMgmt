const SET_SO_HEADER = (state, messages) => {
  state.soHeader = messages;
}

const SET_LIST_LEAD_BUYERS = (state, messages) => {
  state.leadByers = messages.data;
  state.total = messages.total;
};

const SET_LIST_TEAM = (state, messages) => {
  state.team = messages.data;
};

export default {
  SET_SO_HEADER,
  SET_LIST_LEAD_BUYERS,
  SET_LIST_TEAM
};
