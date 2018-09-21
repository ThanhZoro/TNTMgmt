import Vue from 'vue'
const GET_TRACKING = (state, messages) => {
  state.currentTracking = messages;
}
const SET_DATA = (state, messages) => {
  state.data = messages;
}
const DELETE_DATA = (state, messages) => {
  state.data[messages.type] = _.filter(state.data[messages.type], (o) => { return o.id != messages.data.id });
}
const UPDATE_ELEMENT_TRACKING = (state, messages) => {
  var filter = _.findIndex(state.data[messages.element], { id: messages.data.id });
  if (filter > -1) {
    Vue.set(state.data[messages.element], filter, messages.data)
  } else {
    state.data[messages.element].push(messages.data)
  }
};
const UPDATE_TRACKING = (state, messages) => {
  if (state.currentTracking.id == messages.id) {
    state.currentTracking = messages;
  }
}
const SYNC_CONVERSION = (state, messages) => {
  state.data.conversion = messages;
}
export default {
  GET_TRACKING,
  UPDATE_ELEMENT_TRACKING,
  UPDATE_TRACKING,
  SET_DATA,
  DELETE_DATA,
  SYNC_CONVERSION
};
