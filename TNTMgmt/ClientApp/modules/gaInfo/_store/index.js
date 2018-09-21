import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  currentTracking: {},
  data: {    
    profile: null,
    conversion: null,
    call: null,
    qrcode: null,
    tickes: null,
    formTracking: null
  },
  description: {
    choosenTab: 'info',
    id: ''
  }
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
