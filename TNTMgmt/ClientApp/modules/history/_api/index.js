import Vue from 'vue';
const getHistory = async (request) => await Vue.prototype.$http.post(`/api/read/ActivityHistoryLead/GetByQuery`, request);

export default {
    getHistory
};
