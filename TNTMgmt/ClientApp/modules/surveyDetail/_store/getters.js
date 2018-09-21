import Vue from 'vue'
import commonFunc from "@/utils/common-func"
const currentSurveyDetail = (state, getters, rootState) => {
  var data = _.cloneDeep(state.surveyDetail);
  var tree = commonFunc.customizeTree(data);
  return tree;
};

export default {
  currentSurveyDetail
};
