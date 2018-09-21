const SET_LIST_SURVEY = (state, messages) => {
  state.surveys = messages;
};
const UPDATE_LIST_SURVEY = (state, messages) => {
  _.reverse(state.surveys);
  var data = _.find(state.surveys, function (v) { return v.id == messages.id });
  if (data) {
    Object.keys(data).forEach(function (key) {
      data[key] = messages[key];
    });

  } else {
    state.surveys.push(messages);
  }
  _.reverse(state.surveys);
};
export default {
  SET_LIST_SURVEY,
  UPDATE_LIST_SURVEY
};
