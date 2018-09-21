import Vue from 'vue';

const getListMessages = async (request) => {
  return Vue.prototype.$http.post(`/api/read/ChatLead/GetByQuery`, request);
}
const createMessages = async (request) => {
  return Vue.prototype.$http.put('/api/company/ChatLead/Create', request);
}

export default {
  getListMessages,
  createMessages
};
