
const listStatus = (state, getters, rootState) => {
  var data = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 1; });
  data = _.filter(data, (item) => {
    return (item.dataValue.toLowerCase().indexOf(state.status.description.toLowerCase())) > -1 && !item.isDelete;
  });
  data = _.take(_.drop(data, 0), 10);
  return data;
};
const listSource = (state, getters, rootState) => {
  var data = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 2; });
  data = _.filter(data, (item) => {
    return (item.dataValue.toLowerCase().indexOf(state.source.description.toLowerCase())) > -1 && !item.isDelete;
  });
  data = _.take(_.drop(data, 0), 10);
  return data;
};
const listChannel = (state, getters, rootState) => {
  var data = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 3; });
  data = _.filter(data, (item) => {
    return (item.dataValue.toLowerCase().indexOf(state.channel.description.toLowerCase())) > -1 && !item.isDelete;
  });
  data = _.take(_.drop(data, 0), 10);
  return data;
};
const listUser = (state, getters, rootState) => {
  var data = _.filter(rootState.common.users, (item) => {
    return (item.firstName && item.firstName.toLowerCase().indexOf(state.users.description.toLowerCase()) > -1) || (item.lastName && item.lastName.toLowerCase().indexOf(state.users.description.toLowerCase()) > -1) || (item.userName && item.userName.toLowerCase().indexOf(state.users.description.toLowerCase()) > -1);
  });
  data = _.map(data, (v) => {
    v.fullName = (v.lastName ? v.lastName : '') + ' ' + (v.firstName ? v.firstName : '');
    return v;
  })
  data = _.take(_.drop(data, 0), 10); return data;
};
export default {
  listSource,
  listChannel,
  listStatus,
  listUser
};
