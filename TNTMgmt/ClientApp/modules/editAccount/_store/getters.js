const currentUser = (state, getters, rootState) => {
  let user = _.find(rootState.common.users, (v) => { return v.id == rootState.auth.userInfo.profile.sub });
  return user;
};

const getMasterData = (state, getters, rootState) => {
  var data = {};
  data.gender = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 7 && !o.isDelete; });

  return data;
};

export default {
  currentUser,
  getMasterData
};
