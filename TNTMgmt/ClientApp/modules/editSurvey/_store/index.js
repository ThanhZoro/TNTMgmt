import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  surveyDetail: {
    type: '',
    id: '',
    surveyId: '',
    header: {
      text: '',
      textColor: '#000000',
      font: {
        fontSize: '',
        fontWeight: '',
        fontStyle: ''
      },
    },
    body: {
      placeholder: '',
      options: [],
      addOtherOption: false,
      placeholderOtherOption: '',
      isMulti: false,
    }
  },
  survey:null
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
