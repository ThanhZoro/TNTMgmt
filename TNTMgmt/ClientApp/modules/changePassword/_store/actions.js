import api from '../_api';
import Vue from 'vue';

const changePassword = async (context, request) => {
  let response = await api.changePassword(request);
};

export default {
  changePassword
};
