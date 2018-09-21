import api from '../_api';
import Vue from 'vue';

const createData = async (context, request) => {
  let response = await api.createData(request);
  Vue.prototype.$signalRConnection.invoke("Send", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'update-common-data', message: response.data }))
};

const updateData = async (context, request) => {
  let response = await api.updateData(request);
  Vue.prototype.$signalRConnection.invoke("Send", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'update-common-data', message: response.data }))
};

const deleteData = async (context, request) => {
  let response = await api.deleteData(request);
  Vue.prototype.$signalRConnection.invoke("Send", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'update-common-data', message: response.data }))
};

const setDataType = async (context, request) => {
  context.commit('SET_DATA_TYPE', request);
};

export default {
  createData,
  updateData,
  deleteData,
  setDataType
};
