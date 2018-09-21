import Vue from 'vue';

const SHOW_HIDE_COLS = (state, messages) => {
  state.headers[messages.props] = !state.headers[messages.props];
};

const UPDATE_CHOOSEN_FILTER = (state, messages) => {
  state.advanceFilter.show = false;
  if (messages.isDelete) {
    state.advanceFilter.choosenFilter = _.filter(state.advanceFilter.choosenFilter, (v) => { return v.field != messages.field })
  } else {
    var filter = _.findIndex(state.advanceFilter.choosenFilter, { field: messages.field });
    if (filter > -1) {
      Vue.set(state.advanceFilter.choosenFilter, filter, messages)
    } else {
      state.advanceFilter.choosenFilter.push(messages)
    }
  }
};
const UPDATE_LIST_SURVEY = (state, messages) => {
  var data = _.find(state.surveys, function (v) { return v.id == messages.id });
  if (data) {
    Object.keys(data).forEach(function (key) {
      data[key] = messages[key];
    });

  } else {
    state.surveys.push(messages);
    state.total++;
  }
};
const SET_LIST_SURVEY = (state, messages) => {
  state.surveys = messages.data;
  state.total = messages.total;
};
const UPDATE_NUMBER_SURVEY = (state, messages) => {
  var data = _.find(state.surveys, { 'id': messages.surveyId });
  var count = 0;
  _.forEach(messages.surveyDetail, (o) => { if (o.type != 'label') count++ });
  if (data) data.countSurveyDetail = count;
};
export default {
  SHOW_HIDE_COLS,
  UPDATE_CHOOSEN_FILTER,
  SET_LIST_SURVEY,
  UPDATE_LIST_SURVEY,
  UPDATE_NUMBER_SURVEY
};
