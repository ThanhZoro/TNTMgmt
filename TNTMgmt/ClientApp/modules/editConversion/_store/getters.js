const status = (state, getters, rootState) => {

  var status = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 1 && !o.isDelete; });
  status = _.orderBy(status, [function (o) { return o['weight']; }], 'asc');
  return status;
};

export default {
  status
};
