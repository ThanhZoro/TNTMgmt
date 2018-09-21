import Vue from 'vue'

const SET_SURVEY_LEAD_DETAIL = (state, messages) => {
  state.surveyLead = _.filter(messages);
}

const SET_SURVEY_LEAD_DATA = (state, messages) => {
  state.formData = { surveyItems: [] };
  messages.forEach(function (o) {
    state.formData.surveyItems.push({ surveyDetailId: o.surveyDetailId, values: o.values });
  })
}

const UPDATE_SURVEY_LEAD_DATA = (state, messages) => {
  var checkId = _.findIndex(state.formData.surveyItems, function (o) { return o.surveyDetailId == messages.surveyDetailId });
  if (checkId > -1) {
    state.formData.surveyItems[checkId].values = messages.values;
  } else {
    state.formData.surveyItems.push(messages);
  }
}
const SET_DATA = (state, messages) => {
  state.surveyLead = messages.surveyLead;
  state.leadInfo = messages.leadInfo;
  state.nameSurvey = messages.nameSurvey;
  state.formData = { surveyItems: [] };
  messages.formData.forEach(function (o) {
    state.formData.surveyItems.push({ surveyDetailId: o.surveyDetailId, values: o.values });
  })
};
export default {
  SET_SURVEY_LEAD_DETAIL,
  SET_SURVEY_LEAD_DATA,
  UPDATE_SURVEY_LEAD_DATA,
  SET_DATA
};
