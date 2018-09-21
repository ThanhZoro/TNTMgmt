const SET_GOOGLEANLYTICS = (state, messages) => {
  state.googleAnalytic[messages.type] = messages.data;
}
const GET_TRACKING = (state, messages) => {
  state.tracking = messages;
}
const SET_GAMAPPING = (state, messages) => {
  state.GAMapping = messages;
};
export default {
  SET_GOOGLEANLYTICS,
  GET_TRACKING,
  SET_GAMAPPING
};
