const currentUser = (state, getters, rootState) => {
  let user = _.find(rootState.common.users, (v) => { return v.id == rootState.auth.userInfo.profile.sub });
  return user;
};

export default {
  currentUser
};
