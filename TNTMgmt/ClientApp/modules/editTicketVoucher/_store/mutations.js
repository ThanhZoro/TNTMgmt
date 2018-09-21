const GET_TICKET = (state, messages) => {
  state.currentTicketTracking = messages;
}
const UPDATE_TICKET = (state, messages) => {
  var newObject = Object.assign({}, state.ticket);
  Object.keys(newObject).forEach(function (key) {
    newObject[key] = messages[key];
  });
  state.currentTicketTracking = newObject;
}
export default {
  GET_TICKET,
  UPDATE_TICKET
};
