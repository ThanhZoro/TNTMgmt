import Vue from 'vue';

const setupAccount = async (request) => await window.location.replace("https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/analytics%20https://www.googleapis.com/auth/analytics.edit%20https://www.googleapis.com/auth/analytics.readonly&access_type=offline&prompt=consent&include_granted_scopes=true&redirect_uri=" + Vue.cookie.get('apiUrl') + "/api/o2o/googleAnalytics/setup&response_type=code&state=userId%3D" + request.id + "%26returnUrl%3D" + request.returnUrl + "%26companyId%3D" + request.companyId + "%26userName%3D" + request.userName + "&client_id=1075839070656-ttuk3et51oavs0oupgou2bp651iu3s2q.apps.googleusercontent.com");

const getListAccount = async (request) => await Vue.prototype.$http.get(`/api/o2o/googleAnalytics/accounts?accountCredential=${request}`);

const getListProperties = async (request) => await Vue.prototype.$http.get(`/api/o2o/googleAnalytics/properties?accountId=${request.accountId}&accountCredential=${request.accountCredential}`);

const getListProfiles = async (request) => await Vue.prototype.$http.get(`/api/o2o/googleAnalytics/profiles?accountId=${request.accountId}&propertyId=${request.propertyId}&accountCredential=${request.accountCredential}`);

const getTracking = async (request) => await Vue.prototype.$http.get(`/api/read/Tracking/${request}`);
// them accountCredential vao resquest
const editTracking = async (request) => await Vue.prototype.$http.post('/api/o2o/tracking', request);

const getGAMapping = async () => await Vue.prototype.$http.get('/api/read/gaMapping/credentials');

export default {
  setupAccount,
  getListAccount,
  getListProperties,
  getListProfiles,
  editTracking,
  getTracking,
  getGAMapping
};
