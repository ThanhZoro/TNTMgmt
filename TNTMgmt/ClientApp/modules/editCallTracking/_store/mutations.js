const GET_CONVERSION = (state, messages) => {
  state.currentConversion = messages;
}
const GET_CALL = (state, messages) => {
  state.currentCallTracking = messages;
}
export default {
  GET_CALL,
  GET_CONVERSION
};
