const getMasterData = (state, getters, rootState) => {
  var data = {};

  data.status = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 1 && !o.isDelete; });

  data.source = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 2 && !o.isDelete; });

  data.channel = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 3 && !o.isDelete; });

  data.vocative = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 4 && !o.isDelete; });

  data.maritalStatus = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 5 && !o.isDelete; });

  data.relationship = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 6 && !o.isDelete; });

  data.gender = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 7 && !o.isDelete; });

  data.users = _.filter(rootState.common.users, function (o) { return o; });

  return data;
};


export default {
  getMasterData
};
