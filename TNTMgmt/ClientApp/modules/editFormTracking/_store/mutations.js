const SET_FORM_TRACKING = (state, messages) => {
  state.currentFormTracking = messages
}
const GET_CONVERSION = (state, messages) => {
  state.currentConversion = messages;
}

export default {
  SET_FORM_TRACKING,
  GET_CONVERSION
};
