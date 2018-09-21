import api from '../_api';
import Vue from 'vue';

const createUser = async (context, request) => {
    let response = await api.createUser(request);
    Vue.prototype.$signalRConnection.invoke("Send", Vue.cookie.get('tenantId'), JSON.stringify({ type: 'update-user', message: response.data }))
};

export default {
    createUser
};
