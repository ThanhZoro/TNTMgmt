const SET_COMPANY_INFO = (state, request) => {
  state.companyInfo = request;
};

const SET_COMMON_DATA = (state, request) => {
  state.commonDatas = request.commonData;
  state.roles = request.roles;
  state.users = request.users;
};

const UPDATE_LIST_USER = (state, messages) => {
  var data = _.find(state.users, function (v) { return v.id == messages.id });
  if (data) {
    Object.keys(data).forEach(function (key) {
      data[key] = messages[key];
    });

  } else {
    state.users.push(messages);
  }
};

const UPDATE_LIST_COMMON_DATA = (state, messages) => {
  var data = _.find(state.commonDatas, function (v) { return v.id == messages.id });
  if (data) {
    Object.keys(data).forEach(function (key) {
      data[key] = messages[key];
    });

  } else {
    state.commonDatas.push(messages);
  }
};

const SET_TITLE = (state, request) => {
  state.title = request;
};

const UPDATE_PICTURE_USER = (state, messages) => {
  var data = _.find(state.users, function (v) { return v.id == messages.id });
  if (data) {
    data.avatarUrl = messages.avatarUrl;
  }
};
const UPDATE_LIST_SURVEY_HEADER = (state, messages) => {
  var data = _.find(state.surveyHeaders, function (v) { return v.id == messages.id });
  if (data) {
    Object.keys(data).forEach(function (key) {
      data[key] = messages[key];
    });
  } else {
    state.surveyHeaders.push(messages);
  }
};
const UPDATE_ROLES_USER = (state, messages) => {
  _.forEach(messages, (v) => {
    var data = _.find(state.users, { 'id': v.userId });
    if (data) data.roles = v.roles;
  });
}
const UPDATE_TEAM_USER = (state, messages) => {
  _.forEach(messages, (v) => {
    var data = _.find(state.users, { 'id': v.userId });
    if (data) {
      data.teamIds = v.teamIds;
    }
  })
}
const DELETE_TEAM = (state, messages) => {
  _.forEach(state.users, (o) => {
    o.teamIds = _.filter(o.teamIds, (v) => { return v != messages });
  });
};
export default {
  SET_COMPANY_INFO,
  SET_TITLE,
  SET_COMMON_DATA,
  UPDATE_LIST_USER,
  UPDATE_LIST_COMMON_DATA,
  UPDATE_PICTURE_USER,
  UPDATE_LIST_SURVEY_HEADER,
  UPDATE_ROLES_USER,
  UPDATE_TEAM_USER,
  DELETE_TEAM
};
