import Vue from 'vue';
import commonFunc from "@/utils/common-func"
const createTicket = async (request) => {
  let formData = new FormData();
  commonFunc.buildFormData(formData, request);
  let response = await Vue.prototype.$http.put('/api/o2o/voucher', formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  return response;
}

const updateTicket = async (request) => {
  let response = await Vue.prototype.$http.post('/api/o2o/voucher', request);
  return response;
}


const getTicket = async (request) => await Vue.prototype.$http.get(`/api/read/Voucher/${request}`);

const updateLogo = async (request) => {
  let formData = new FormData();
  commonFunc.buildFormData(formData, request);
  let response = await Vue.prototype.$http.post('/api/o2o/voucher/image', formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  return response;
}
export default {
  createTicket,
  updateTicket,
  getTicket,
  updateLogo
};
