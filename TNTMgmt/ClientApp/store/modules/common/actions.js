import api from 'api';

const getCompanyCommonData = async (context) => {
  let response = await api.getCompanyCommonData();
  await context.commit('SET_COMPANY_INFO', response[0].data);
  await context.commit('SET_COMMON_DATA', response[1].data);
  return response.data;
};

const getCompany = async (context) => {
  let response = await api.getCompany();
  await context.commit('SET_COMPANY_INFO', response.data);
  return response.data;
};

const getAllCommonData = async (context) => {
  let response = await api.getAllCommonData();
  await context.commit('SET_COMMON_DATA', response.data);
  return response.data;
};

const updateCompanyInfo = async (context, request) => {
  await context.commit('SET_COMPANY_INFO', request);
};

const setTitle = async (context, request) => {
  await context.commit('SET_TITLE', request);
};

const updateListUser = async (context, request) => {
  context.commit('UPDATE_LIST_USER', request);
};

const updateListCommonData = async (context, request) => {
  context.commit('UPDATE_LIST_COMMON_DATA', request);
};

const updatePictureUser = async (context, request) => {
  context.commit('UPDATE_PICTURE_USER', request);
};
const updateRolesUser = async (context, request) => {
  context.commit('UPDATE_ROLES_USER', request);
};
const updateTeamUser = async (context, request) => {
  context.commit('UPDATE_TEAM_USER', request);
};
const deleteTeam = async (context, request) => {
  context.commit('DELETE_TEAM', request);
};
export default {
  getCompany,
  updateCompanyInfo,
  setTitle,
  updateListUser,
  getAllCommonData,
  updateListCommonData,
  updatePictureUser,
  getCompanyCommonData,
  updateRolesUser,
  updateTeamUser,
  deleteTeam
};
