import Vue from 'vue'
import commonData from "@/utils/common-data"

const getUser = (state, getters, rootState) => {
  var data = _.filter(rootState.common.users, (item) => {
    return (item.firstName.toLowerCase().indexOf(state.user.description.toLowerCase()) > -1 ||
      item.phoneNumber.toLowerCase().indexOf(state.user.description.toLowerCase()) > -1 ||
      item.email.toLowerCase().indexOf(state.user.description.toLowerCase()) > -1 ||
      (item.lastName && item.lastName.toLowerCase().indexOf(state.user.description.toLowerCase()) > -1))
  });
  return data;
};
export default {
  getUser
};
