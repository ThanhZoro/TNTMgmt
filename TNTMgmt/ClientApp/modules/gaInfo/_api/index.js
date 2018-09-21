import Vue from 'vue';

const getTracking = async (request) => await Vue.prototype.$http.get(`/api/read/Tracking/${request}`);

const getTrackingDetail = async (request) => await Vue.prototype.$http.all([getListconversion(request), getForms(request), getQRCode(request), getCall(request), getQRTickets(request), getFormFields()]);

const getListconversion = async (request) => await Vue.prototype.$http.get(`/api/read/Goal?trackingId=${request}`);

const getForms = async (request) => await Vue.prototype.$http.get(`/api/read/Form?trackingId=${request}`);

const getFormFields = async (request) => await Vue.prototype.$http.get(`/api/o2o/form/fields`);

const deleteForm = async (request) => await Vue.prototype.$http.delete(`/api/o2o/form/${request}`);

const getQRCode = async (request) => await Vue.prototype.$http.get(`/api/read/QRCode?trackingId=${request}`);

const deleteQRCode = async (request) => await Vue.prototype.$http.delete(`/api/o2o/qrCode/${request}`);

const getCall = async (request) => await Vue.prototype.$http.get(`/api/read/Call?trackingId=${request}`);

const deleteScall = async (request) => await Vue.prototype.$http.delete(`/api/o2o/call/${request}`);

const getQRTickets = async (request) => await Vue.prototype.$http.get(`/api/read/Voucher?trackingId=${request}`);

const deleteTicket = async (request) => await Vue.prototype.$http.delete(`/api/o2o/voucher/${request}`);

const syncConversion = async (request) => await Vue.prototype.$http.post(`/api/o2o/goal/sync?trackingId=${request}`);

const deleteTracking = async (request) => await Vue.prototype.$http.delete('/api/o2o/tracking', { data: request });
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
