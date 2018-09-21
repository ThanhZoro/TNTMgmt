const getMasterData = (state, getters, rootState) => {
  var data = { };

  data.status = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 1 && !o.isDelete; });
  data.status = _.orderBy(data.status, [function (o) { return o['weight']; }], 'asc');

  data.source = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 2 && !o.isDelete; });
  data.source = _.orderBy(data.source, [function (o) { return o['weight']; }], 'asc');

  data.channel = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 3 && !o.isDelete; });
  data.channel = _.orderBy(data.channel, [function (o) { return o['weight']; }], 'asc');

  data.vocative = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 4 && !o.isDelete; });
  data.vocative = _.orderBy(data.vocative, [function (o) { return o['weight']; }], 'asc');

  data.maritalStatus = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 5 && !o.isDelete; });
  data.maritalStatus = _.orderBy(data.maritalStatus, [function (o) { return o['weight']; }], 'asc');

  data.relationship = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 6 && !o.isDelete; });
  data.relationship = _.orderBy(data.relationship, [function (o) { return o['weight']; }], 'asc');

  data.gender = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 7 && !o.isDelete; });
  data.gender = _.orderBy(data.gender, [function (o) { return o['weight']; }], 'asc');

  data.users = _.filter(rootState.common.users, function (o) { return o; });

  return data;
};

const currentLead = (state, getters, rootState) => {
  if (rootState.route.params.id) {
    return state.lead ? state.lead : null;
  } else {
    return {};
  }
};
const getTeam = (state, getters, rootState) => {
  var user = _.find(rootState.common.users, { 'id': rootState.auth.userInfo.profile.sub });
  if (user) {
    var team = [];
    _.forEach(user.teamIds, (v) => {
      team.push({ id: v });
    });
    return team;
  }
};
export default {
  getMasterData,
  currentLead,
  getTeam
};
