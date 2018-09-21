import Vue from 'vue';
import commonFunc from "@/utils/common-func"
const importLead = async (request) => {
  let formData = new FormData();
  commonFunc.buildFormData(formData, request);
  let response = await Vue.prototype.$http.post('/api/company/lead/import', formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
};

const getTemplate = async (request) => {
  let response = await Vue.prototype.$http.get(`/api/company/lead/importTemplate?filename=lead_import_template_${request}.xlsx`, {
    responseType: 'blob'
  });
  return response;
};

export default {
  importLead,
  getTemplate
};
