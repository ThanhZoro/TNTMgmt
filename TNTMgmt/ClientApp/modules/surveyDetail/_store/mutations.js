import Vue from 'vue'

const SET_SURVEY_DETAILS = (state, messages) => {
  state.surveyDetail = messages;
}

const UPDATE_LIST_SURVEY_DETAILS = (state, messages) => {
  var data = _.find(state.surveyDetail, function (o) { return o.id == messages.id });
  if (data) {
    Object.keys(data).forEach(function (key) {
      data[key] = messages[key];
    });
  } else {
    state.surveyDetail.push(messages);
  }
};

const DELETE_SURVEY = (state, messages) => {
  state.surveyDetail = _.filter(state.surveyDetail, (o) => { return _.indexOf(messages, o.id) == -1 });
}
const SORT_SURVEY = (state, messages) => {
  _.forEach(messages.sortItems, (o,i) => {
    var data = _.find(state.surveyDetail, { "id": o.id });
    if (data) {
      data.parentId = o.parentId;
      data.ordinal = i + 1;
    } 
  });
}
export default {
  SET_SURVEY_DETAILS,
  UPDATE_LIST_SURVEY_DETAILS,
  DELETE_SURVEY,
  SORT_SURVEY
};
