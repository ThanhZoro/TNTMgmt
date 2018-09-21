import Vue from 'vue'

const listMessages = (state, getters, rootState) => {
  var listMessagesData = [];
  if (state.listMessages) {
    var data = _.map(state.listMessages, function (v) {
      var user = _.find(rootState.common.users, { 'id': v.userId });
      if (user) {
        v.timeChat = Vue.prototype.$moment.utc(v.createdAt).local().calendar();
        v.name = (user.firstName ? user.firstName.substring(0, 1) : '');
        v.avatarUrl = user.avatarUrl;
      }
      return v;
    });
    data = _.filter(data, { "leadId": rootState.route.params.id });
    //sort & take - skip
    data = _.orderBy(data, ['createdAt'], ['asc']);
    listMessagesData = data;
  }
  return listMessagesData;
};

export default {
  listMessages
};
