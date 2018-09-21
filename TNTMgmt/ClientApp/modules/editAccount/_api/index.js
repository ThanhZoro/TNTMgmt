import Vue from 'vue';
const updateUser = async (request) => await Vue.prototype.$http.post('/api/accounts/update', request);

export default {
    updateUser
};
