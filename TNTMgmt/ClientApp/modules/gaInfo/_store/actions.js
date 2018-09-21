import api from '../_api';
import Vue from 'vue';

const getTracking = async (context, request) => {
  let response = await api.getTracking(request);
  context.commit('GET_TRACKING', response.data);
}

const getTrackingDetail = async (context, request) => {
  let response = await api.getTrackingDetail(request);
  context.commit('SET_DATA', { conversion: response[0].data, formTracking: response[1].data, qrcode: response[2].data, call: response[3].data, tickes: response[4].data, formFields: response[5].data });
}

const deleteForm = async (context, request) => {
  let response = await api.deleteForm(request);
  context.commit('DELETE_DATA', { data: response.data, type: 'formTracking' });
}

const deleteQRCode = async (context, request) => {
  let response = await api.deleteQRCode(request);
  context.commit('DELETE_DATA', { data: response.data, type: 'qrcode' });
}

const deleteScall = async (context, request) => {
  let response = await api.deleteScall(request);
  context.commit('DELETE_DATA', { data: response.data, type: 'call' });
}

const deleteTicket = async (context, request) => {
  let response = await api.deleteTicket(request);
  context.commit('DELETE_DATA', { data: response.data, type: 'tickes' });
}

const syncConversion = async (context, request) => {
  let response = await api.syncConversion(request);
  context.commit('SYNC_CONVERSION', response.data);
}
const deleteTracking = async (context, request) => {
  let response = await api.deleteTracking(request);
  return response;
};
export default {
  getTracking,
  getTrackingDetail,
  deleteForm,
  deleteQRCode,
  deleteScall,
  deleteTicket,
  syncConversion,
  deleteTracking
};
