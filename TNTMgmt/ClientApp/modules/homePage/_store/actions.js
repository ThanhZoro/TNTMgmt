import api from '../_api';
import Vue from 'vue';

const getLeadReport = async (context) => {
  let response = await api.getLeadReport();
  context.commit('SET_DATA', response.data);
}

export default {
  getLeadReport
};
