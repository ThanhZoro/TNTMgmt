import Vue from 'vue';
import commonFunc from 'utils/common-func'
const uploadAvatar = async (request) => {
  let formData = new FormData();
  commonFunc.buildFormData(formData, request);
  let response = await Vue.prototype.$http.post('/api/accounts/UploadAvatar', formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  return response;
}

export default {
  uploadAvatar
};
