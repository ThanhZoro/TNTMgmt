import api from '../_api';
import Vue from 'vue';
import commonFunc from "@/utils/common-func";
const editTeam = async (context, request) => {
  var response = request.id ? await api.updateTeam(request) : await api.createTeam(request);
  await dispatchUpdataListTeam(context, response.data);
  return response;
}
const getTeam = async (context, request) => {
  var response = await api.getTeam(request);
  context.commit("SET_TEAM", response.data);
}
const dispatchUpdataListTeam = async (context, data) => {
  if (context.rootState["$_team"]) {
    await context.commit('$_team/UPDATE_LIST_TEAM', data, { root: true });
  } else {
    await commonFunc.sleep(1000)
  }
}

export default {
  editTeam,
  getTeam,
  dispatchUpdataListTeam
};
