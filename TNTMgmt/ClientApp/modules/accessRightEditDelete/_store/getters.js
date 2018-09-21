import Vue from 'vue'
import commonFunc from "@/utils/common-func"
const getRoles = (state, getters, rootState) => {
  var roles = _.cloneDeep(rootState.common.roles);
  var data = commonFunc.treeRoles(roles);
  return data;
};
const currentUser = (state, getters, rootState) => {
  if (rootState.route.params.id) {
    let user = _.find(rootState.common.users, (v) => { return v.id == rootState.route.params.id });
    if (user) {
      user['treeRoles'] = [];
      _.forEach(user.roles, (v) => {
        _.forEach(getters.getRoles, (o) => {
          var roles = _.find(o.children, { 'value': v });
          if (roles) user['treeRoles'].push([o.label, v]);
        });
      });
      return user;
    }
  }
};
export default {
  getRoles,
  currentUser
};
