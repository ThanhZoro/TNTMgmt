const GET_CONVERSION = (state, messages) => {
  state.currentConversion = messages;
}
const GET_QACODE = (state, messages) => {
  state.currentQRCodeTracking = messages;
}
export default {
  GET_CONVERSION,
  GET_QACODE
};
