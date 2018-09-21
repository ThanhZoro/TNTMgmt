import Vue from 'vue'
const dataConversion = (state, getters, rootState) => {
  var conversion = {};
  var count = 0;
  var data = _.map(state.data.conversion, (v) => {
    if (v.value) {
      var data = _.find(rootState.common.commonDatas, { 'dataType': 1, 'id': v.value });
      v.status = data ? data.dataValue : '';
    }
    if (!v.id) count++;
    return v;
  });
  conversion.data = data;
  conversion.count = count;
  return conversion;
}
const dataFormTracking = (state, getters, rootState) => {
  var data = _.map(state.data.formTracking, (v) => {
    var status = _.find(rootState.common.commonDatas, (o) => { return o.id == v.status && o.dataType == 1 });
    if (status) {
      v.nameStatus = status.dataValue ? status.dataValue : '';
    }
    var source = _.find(rootState.common.commonDatas, (o) => { return o.id == v.source && o.dataType == 2 });
    if (source) {
      v.sourceName = source.dataValue ? source.dataValue : '';
    }
    var channel = _.find(rootState.common.commonDatas, (o) => { return o.id == v.channel && o.dataType == 3 });
    if (channel) {
      v.channelName = channel.dataValue ? channel.dataValue : '';
    }
    var staffInCharge = _.find(rootState.common.users, { 'id': v.staffInCharge });
    v.nameStaffInCharge = staffInCharge ? staffInCharge.lastName + " " + staffInCharge.firstName : '';
    var goalName = _.find(state.data.conversion, (o) => { return o.id == v.goalId });
    v.goalName = goalName ? goalName.name : '';
    return v;
  });
  data = _.filter(data, (o) => { return !o.isDelete });
  return data;
}

const getQACode = (state, getters, rootState) => {
  if (state.data.qrcode) {
    var data = _.map(state.data.qrcode, (v) => {
      var goalName = _.find(state.data.conversion, (o) => { return o.id == v.goalId });
      v.goalName = goalName ? goalName.name : '';
      return v;
    })
    return data;
  }
}

const getCall = (state, getters, rootState) => {
  if (state.data.call) {
    var data = _.map(state.data.call, (v) => {
      var goalName = _.find(state.data.conversion, (o) => { return o.id == v.goalId });
      v.goalName = goalName ? goalName.name : '';
      return v;
    })
    return data;
  }
}
const getTickets = (state, getters, rootState) => {
  if (state.data.tickes) {
    var data = _.map(state.data.tickes, (v) => {
      v.startTime = Vue.prototype.$moment(v.dateOfValidity).format("YYYY-MM-DD hh:mm");
      v.endTime = Vue.prototype.$moment(v.expiryDate).format("YYYY-MM-DD hh:mm");
      return v;
    })
    return data;
  }
}
export default {
  dataFormTracking,
  getQACode,
  getCall,
  getTickets,
  dataConversion
};
