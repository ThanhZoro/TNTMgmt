import Vue from 'vue'
import commonFunc from "@/utils/common-func"
const getTeam = (state, getters, rootState) => {
  if (rootState.route.params.id) {
    var getTeam = {data : [], team : []};
    var user = _.find(rootState.common.users, { 'id': rootState.route.params.id });
    var team = _.forEach(user.teamIds, (v) => { getTeam.team.push({id: v}) });
    getTeam.data = user;
    return getTeam;
  }
};
export default {
  getTeam
};
