import Vue from 'vue';

const SET_LIST_LEADS = (state, messages) => {
  state.leads = messages.data;
  state.total = messages.total;
};

const SHOW_HIDE_COLS = (state, messages) => {
  state.headers[messages.props] = !state.headers[messages.props];
};

const UPDATE_CHOOSEN_FILTER_LEADS = (state, messages) => {
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

const UPDATE_FILTER_CHECKBOX = (state, messages) => {
  state.searchRequestFilter.desFilter = messages.data;
};

const UPDATE_LIST_LEAD = (state, messages) => {
  var data = _.find(state.leads, function (v) { return v.id == messages.id });
  if (data) {
    Object.keys(data).forEach(function (key) {
      data[key] = messages[key];
    });
  } else {
    state.leads.push(messages);
    state.total++;
  }
};

const UPDATE_SURVEY_LEAD = (state, messages) => {
  var firstSurveyLead = messages.surveyLeads[0];
  var data = _.find(state.leads, function (o) { return o.id == firstSurveyLead.leadId; });
  if (data) {
    var exits = data.surveyed.indexOf(firstSurveyLead.surveyHeaderId);
    if (exits == -1) data.surveyed.push(firstSurveyLead.surveyHeaderId);
  }
};
const UPDATE_STAFFINCHARGE = (state, messages) => {
  _.forEach(messages.ids, (o) => {
    var data = _.find(state.leads, (v) => { return v.id == o });
    if (data) data.staffInCharge = messages.staffInCharge;
  });
};
const UPDATE_LIST_TRACKING = (state, messages) => {
  state.trackingList = messages.data;
};

export default {
  SHOW_HIDE_COLS,
  SET_LIST_LEADS,
  UPDATE_CHOOSEN_FILTER_LEADS,
  UPDATE_FILTER_CHECKBOX,
  UPDATE_LIST_LEAD,
  UPDATE_SURVEY_LEAD,
  UPDATE_STAFFINCHARGE,
  UPDATE_LIST_TRACKING
};
