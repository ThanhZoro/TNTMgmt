import Vue from 'vue';
const updateInfo = async (request) => await Vue.prototype.$http.post('/api/company/updateInfo', request);
const updateLogo = async (request) => await Vue.prototype.$http.post('/api/company/updateLogo',
    request,
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

export default {
    updateInfo,
    updateLogo
};
