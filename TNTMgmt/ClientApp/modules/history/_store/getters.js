import Vue from 'vue'

const getHistory = (state, getters, rootState) => {
  var history = state.data;
  if (history) {
    _.map(history, (o) => {
      o.fromNowCreate = Vue.prototype.$moment.utc(o.createdAt).fromNow();
      switch (o.type) {
        case "edit":
          if (o.activity.indexOf('update') > -1) {
            o.description = "history.updated"
          } else {
            o.description = "history.created"
          }
          break;
        case "note":
          o.titleNote = o.activity;
          break;
        case "status":
          var newStatus = _.find(rootState.common.commonDatas, { 'id': o.activity, 'dataType': 1 });
          if (newStatus) { o.newStatus = newStatus.dataValue };
          var oldStatus = _.find(rootState.common.commonDatas, { 'id': o.note, 'dataType': 1 });
          if (oldStatus) { o.oldStatus = oldStatus.dataValue };
          break;
        case "phone":
          o.description = "history.call"
          break;
        case "email":
          o.description = "history.email"
          break;
        case "sms":
          o.description = "history.sms"
          break;
        default:
          break;
      }
      return o;
    });
  }
  return history;
};
const getValueChecked = (state, getters, rootState) => {
  var data = [];
  _.forEach(state.filter, (o) => {
    if (_.indexOf(state.checkList, o.value) > -1) {
      data.push(o);
    }
  });
  return data;
};
export default {
  getHistory,
  getValueChecked,
};
