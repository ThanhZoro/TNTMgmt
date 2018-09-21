import Vue from 'vue'
import commonFunc from "@/utils/common-func"
const getUser = (state, getters, rootState) => {
  if (rootState.route.params.id) {
    var data = []
    _.forEach(rootState.common.users, (o) => {
      if (_.indexOf(o.teamIds, rootState.route.params.id) > -1) {
        data.push(o.id);
      }     
    });
    return data;
  }
};
export default {
  getUser
};
