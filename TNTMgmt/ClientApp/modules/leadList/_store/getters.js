import Vue from 'vue'
import utils from '@/utils/advanceFilter'
import commonData from "@/utils/common-data"
import commonFunc from "@/utils/common-func"

const leadData = (state, getters, rootState) => {
  var leadData = {};
  if (state.leads) {
    var data = _.map(state.leads, function (v) {
      var source = _.find(rootState.common.commonDatas, (o) => { return o.id == v.source });
      if (source) {
        v.sourceName = source.dataValue;
      }
      var channel = _.find(rootState.common.commonDatas, (o) => { return o.id == v.channel });
      if (channel) {
        v.channelName = channel.dataValue;
      }
      var status = _.find(rootState.common.commonDatas, (o) => { return o.id == v.status });
      if (status) {
        v.statusName = status.dataValue;
        v.statusColor = status.color;
      } else {
        v.statusName = null;
        v.statusColor = null;
      }
      var user = _.find(rootState.common.users, (o) => { return o.id == v.staffInCharge });
      if (user) {
        v.staffInChargeName = user.userName;
      }
      var gender = _.find(rootState.common.commonDatas, (o) => { return o.id == v.gender });
      if (gender) {
        v.gender = gender.dataValue;
      }
      if (rootState.common.companyInfo.otherSettings.surveyId) {
        v.isSuveyed = v.surveyed.indexOf(rootState.common.companyInfo.otherSettings.surveyId) != -1 ? true : false;
      }
      v.noteContent = v.note ? commonFunc.shorten(v.note, 50) : '';
      v.fromNowCreate = Vue.prototype.$moment.utc(v.createdAt).fromNow();
      v.fromNowUpdate = Vue.prototype.$moment.utc(v.updatedAt).fromNow();
      return v;
    });
    leadData.total = state.total;
    data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder == 1 ? 'desc' : 'asc']);
    leadData.data = data;
  }
  return leadData;
};

const filterData = (state, getters, rootState) => {
  if (state.advanceFilter && state.advanceFilter.showData) {
    var data = [];
    var valuePre = [];
    switch (state.advanceFilter.showData.field) {
      case "gender":
        valuePre = _.filter(rootState.common.commonDatas, function (o) {
          return ((o.dataType == 7) && (!o.isDelete) &&
            (o.dataValue && o.dataValue.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1));
        });
        valuePre.forEach(function (value) {
          data.push({ id: value.id, name: value.dataValue });
        });
        break;
      case "status":
        valuePre = _.filter(rootState.common.commonDatas, function (o) {
          return ((o.dataType == 1) && (!o.isDelete) &&
            (o.dataValue && o.dataValue.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1));
        });
        valuePre.forEach(function (value) {
          data.push({ id: value.id, name: value.dataValue });
        });
        break;
      case "source":
        valuePre = _.filter(rootState.common.commonDatas, function (o) {
          return ((o.dataType == 2) && (!o.isDelete) &&
            (o.dataValue && o.dataValue.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1));
        });
        valuePre.forEach(function (value) {
          data.push({ id: value.id, name: value.dataValue });
        });
        break;
      case "channel":
        valuePre = _.filter(rootState.common.commonDatas, function (o) {
          return ((o.dataType == 3) && (!o.isDelete) &&
            (o.dataValue && o.dataValue.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1));
        });
        valuePre.forEach(function (value) {
          data.push({ id: value.id, name: value.dataValue });
        });
        break;
      case "staffInCharge":
        valuePre = _.filter(rootState.common.users, function (v) {
          return ((v.userName && v.userName.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1) ||
            (v.firstName && v.firstName.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1) ||
            (v.email && v.email.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1) ||
            (v.phoneNumber && v.phoneNumber.indexOf(state.searchRequestFilter.desFilter) > -1));
        });
        valuePre.forEach(function (value) {
          data.push({ id: value.id, name: value.firstName + ' | ' + value.userName });
        });
        break;
      case "supportStaff":
        valuePre = _.filter(rootState.common.users, function (v) {
          return ((v.userName && v.userName.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1) ||
            (v.firstName && v.firstName.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1) ||
            (v.email && v.email.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1) ||
            (v.phoneNumber && v.phoneNumber.indexOf(state.searchRequestFilter.desFilter) > -1));
        });
        valuePre.forEach(function (value) {
          data.push({ id: value.id, name: value.firstName + ' | ' + value.userName });
        });
        break;
      case "trackingId":
        valuePre = _.filter(state.trackingList, function (v) {
          if (state.searchRequestFilter.desFilter != '') {
            return ((v.name && v.name.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1) ||
              (v.websiteUrl && v.websiteUrl.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1));
          } else {
            return v;
          } 
        });
        valuePre.forEach(function (value) {
          data.push({ id: value.id, name: value.name + ' | ' + value.websiteUrl});
        });
        break;
      default:
    }
    data = _.take(data, state.searchRequestFilter.size);
    return data;
  }
};

const remainFilters = (state, getters, rootState) => {
  return _.filter(state.advanceFilter.filters, (v) => {
    return !_.find(state.advanceFilter.choosenFilter, { field: v.field })
  })
};

const getMasterData = (state, getters, rootState) => {
  var data = { };
  data.status = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 1 && !o.isDelete; });
  data.status = _.orderBy(data.status, [function (o) { return o['weight']; }], 'asc');

  data.users = _.filter(rootState.common.users, function (o) { return o; });
  return data;
};

export default {
  leadData,
  filterData,
  remainFilters,
  getMasterData
};
