import Vue from 'vue'

const SET_CONTACTS = (state, messages) => {
  state.contacts = messages.data;
  state.searchRequest.total = messages.total;
}
const UPDATE_DATA = (state, messages) => {
  state.contacts = _.filter(state.contacts, (o) => { return o.id != messages.id });
};
const UPDATE_LIST_CONTACT = (state, messages) => {
  var data = _.find(state.contacts, function (v) { return v.id == messages.id });
  if (data) {
    Object.keys(data).forEach(function (key) {
      data[key] = messages[key];
    });

  } else {
    state.contacts.push(messages);
  }
};
const SET_LEAD_ID = (state, messages) => {
  state.leadId = messages;
}
export default {
  SET_CONTACTS,
  UPDATE_DATA,
  UPDATE_LIST_CONTACT,
  SET_LEAD_ID
};
