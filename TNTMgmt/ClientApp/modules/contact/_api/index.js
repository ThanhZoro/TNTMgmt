import Vue from 'vue';

const getAllContact = async (request) => {
  return Vue.prototype.$http.post(`/api/read/ContactLead/GetByQuery`, request);
}
const deleteContact = async (request) => await Vue.prototype.$http.delete(`/api/company/ContactLead/Delete?id=${request.id}&leadId=${request.leadId}`);
export default {
  getAllContact,
  deleteContact
};
