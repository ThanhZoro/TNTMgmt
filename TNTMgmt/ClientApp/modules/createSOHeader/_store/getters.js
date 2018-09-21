const getUsers = (state, getters, rootState) => {
  var users = _.filter(rootState.common.users, function (o) { return o; });

  return users;
};

const currentSOHeader = (state, getters, rootState) => {
  if (rootState.route.params.id) {
    return state.soHeader ? state.soHeader : null;
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
  currentSOHeader,
  getUsers,
  getTeam
};
