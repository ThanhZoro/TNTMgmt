import Vue from 'vue';
const createUser = async (request) => await Vue.prototype.$http.put('/api/accounts/create', request);

export default {
    createUser
};
