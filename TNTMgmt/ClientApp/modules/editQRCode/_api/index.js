import Vue from 'vue';
const getConversion = async (request) => await Vue.prototype.$http.get(`/api/read/Goal?trackingId=${request}`);

const createQRCode = async (request) => await Vue.prototype.$http.put(`/api/o2o/qrCode`, request);

const getQACode = async (request) => await Vue.prototype.$http.get(`/api/read/QRCode/${request}`);

const updateQRCode = async (request) => await Vue.prototype.$http.post(`/api/o2o/qrCode`, request);

export default {
  getConversion,
  createQRCode,
  getQACode,
  updateQRCode
};
