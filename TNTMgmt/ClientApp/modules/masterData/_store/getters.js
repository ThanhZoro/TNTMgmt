const commonDatas = (state, getters, rootState) => {
  var data = _.filter(rootState.common.commonDatas, (v) => { return !v.isDelete; });
  data = _.orderBy(data, [function (o) { return o['weight']; }], 'asc');
  return data;
};

export default {
  commonDatas
};
