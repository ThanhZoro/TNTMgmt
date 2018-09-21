import Vue from 'vue'

const contactData = (state, getters, rootState) => {
  var contactData = {};
  if (state.contacts) {
    var data = _.filter(state.contacts, function (v) {
      return ((v.name && v.name.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1) ||
        (v.email && v.email.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1) ||
        (v.phone && v.phone.indexOf(state.searchRequest.description) > -1));
    });
    //sort & take - skip
    contactData.data = data;
  }
  return contactData;
};

export default {
  contactData
};
