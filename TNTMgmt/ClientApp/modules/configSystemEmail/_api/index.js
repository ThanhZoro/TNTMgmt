import Vue from 'vue';
const updateInfo = async (request) => await Vue.prototype.$http.post('/api/company/UpdateMailSettings', request);

export default {
    updateInfo
};
