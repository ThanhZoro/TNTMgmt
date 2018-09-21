const listUser = (state, getters, rootState) => {
  var data = _.filter(rootState.common.users, (item) => {
    return (item.firstName && item.firstName.toLowerCase().indexOf(state.users.description.toLowerCase()) > -1) || (item.lastName && item.lastName.toLowerCase().indexOf(state.users.description.toLowerCase()) > -1) || (item.userName && item.userName.toLowerCase().indexOf(state.users.description.toLowerCase()) > -1);
  });
  data = _.map(data, (v) => {
    v.fullName = (v.lastName ? v.lastName : '') + ' ' + (v.firstName ? v.firstName : '');
    return v;
  })
  data = _.take(_.drop(data, 0), 10);
  return data;
};

export default {
  listUser
};
