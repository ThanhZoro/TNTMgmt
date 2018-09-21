const currentSurveyDetail = (state, getters, rootState) => {
  if (!rootState.route.params.id) {
    state.surveyDetail = { header: { font: {} }, body: { options: [] } };
    state.surveyDetail.type = 'label';
    state.surveyDetail.header.textColor = '#000000';
    state.surveyDetail.surveyId = rootState.route.params.surveyId;
  }
  return state.surveyDetail;
};

const surveyParent = (state, getters, rootState) => {
  var data = [];
  if (state.survey) {
    var response = getParentIds(state.survey, [rootState.route.params.id]);
    data = _.filter(state.survey, (o) => { return _.indexOf(response, o.id) == -1 && o.id != rootState.route.params.id })
  }
  return data;
};
const getParentIds = (survey, parentIds, response = []) => {
  var data = _.filter(survey, (o) => {
    return _.indexOf(parentIds, o.parentId) != -1;
  });
  if (data.length) {
    var ids = _.map(data, (o) => { return o.id });
    _.forEach(ids, function (value) {
      response.push(value);
    });
    getParentIds(survey, ids, response);
  }
  return response;
}
export default {
  currentSurveyDetail,
  surveyParent
};
