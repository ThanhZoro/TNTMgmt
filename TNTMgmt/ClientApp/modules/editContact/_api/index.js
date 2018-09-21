import Vue from 'vue';
const updateLogo = async (request) => {
  let formData = new FormData();
  Object.keys(request).forEach(key => formData.append(key, request[key]));
  let response = await Vue.prototype.$http.post(`/api/company/ContactLead/Upload`, formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  return response;
};
const createContact = async (request) => {
  let formData = new FormData();
  Object.keys(request).forEach(key => formData.append(key, request[key]));
  let response = await Vue.prototype.$http.put(`/api/company/ContactLead/Create`, formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  return response;
};

const updateContact = async (request) => {
  let response = await Vue.prototype.$http.post(`/api/company/ContactLead/Update`, request);
  return response;
};
const getInfoId = async (request) => {
  return Vue.prototype.$http.get(`/api/read/ContactLead/GetById?id=${request}`);
}
export default {
  updateLogo,
  getInfoId,
  updateContact,
  createContact
};
