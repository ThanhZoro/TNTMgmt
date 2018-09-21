import Vue from 'vue'
import commonFunc from "@/utils/common-func"
const getRoles = (state, getters, rootState) => {
  var roles = _.cloneDeep(rootState.common.roles);
  var data = commonFunc.treeRoles(roles);
  return data;
};
export default {
  getRoles
};
