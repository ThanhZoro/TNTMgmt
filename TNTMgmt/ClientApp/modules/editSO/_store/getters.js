const getUsers = (state, getters, rootState) => {
  var users = _.filter(rootState.common.users, function (o) { return o; });

  return users;
};

const getCurrentCompany = (state, getters, rootState) => {
  return rootState.common.companyInfo;
};

const currentSO = (state, getters, rootState) => {
  if (rootState.route.params.soHeaderId) {
    return state.soData ? state.soData : {};
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
  getCurrentCompany,
  currentSO,
  getUsers,
  getTeam
};
