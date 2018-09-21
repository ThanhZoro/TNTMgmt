const getMasterData = (state, getters, rootState) => {
  var data = {};
  data.gender = _.filter(rootState.common.commonDatas, function (o) { return o.dataType == 7 && !o.isDelete; });

  return data;
};

export default {
  getMasterData
};
