const GET_SURVEY_DETAIL = (state, messages) => {
  state.surveyDetail = messages;
}
const SET_SURVEY_ALL_DETAILS = (state, messages) => {
  state.survey = messages;
}
export default {
  GET_SURVEY_DETAIL,
  SET_SURVEY_ALL_DETAILS
};
