import Vue from 'vue'
import commonFunc from "@/utils/common-func"
const surveyLead = (state, getters, rootState) => {
  var data = _.cloneDeep(state.surveyLead);
  var tree = commonFunc.customizeTree(data);
  return tree;
};

const surveyLeadData = (state, getters, rootState) => {
  return state.formData;
};

export default {
  surveyLead,
  surveyLeadData
};
