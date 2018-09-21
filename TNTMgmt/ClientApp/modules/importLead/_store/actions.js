import api from '../_api';
import Vue from 'vue';

const getTemplate = async (context,request) => {
  let response = await api.getTemplate(request);
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'lead_import_template.xlsx');
  document.body.appendChild(link);
  link.click();
}
const importLead = async (context, request) => {
  await api.importLead(request);
};
export default {
  getTemplate,
  importLead
};
