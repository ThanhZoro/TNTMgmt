import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  leads: null,
  trackingList: null,
  total: 0,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: 1 }
  },
  searchRequestTracking: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: 1 }
  },
  searchRequestFilter: {
    desFilter: '',
    size: 5
  },
  headers: {
    generalInfo: true,
    customerCare: true,
    assignment: true,    
    sourceChannel: true,
    onlineInfo: true,
    create: false,
    update: false,
  },
  advanceFilter: {
    filters: [
      { searchType: "checkbox", field: "gender", text: "leadsPage.gender", dispatch: "" },
      { searchType: "checkbox", field: "status", text: "leadsPage.status", dispatch: "" },
      { searchType: "checkbox", field: "source", text: "leadsPage.source", dispatch: "" },
      { searchType: "checkbox", field: "channel", text: "leadsPage.channel", dispatch: "" },
      { searchType: "checkbox", field: "staffInCharge", text: "leadsPage.staffInCharge", dispatch: "" },
      { searchType: "checkbox", field: "supportStaff", text: "leadsPage.supportStaff", dispatch: "" },
      { searchType: "checkbox", field: "trackingId", text: "leadsPage.trackingId", dispatch: "" },
      { searchType: "text", field: "campaign", text: "leadsPage.campaign", dispatch: "" },
      { searchType: "text", field: "interest", text: "leadsPage.interest", dispatch: "" },
      { searchType: "text", field: "socialId", text: "leadsPage.socialId", dispatch: "" },
      { searchType: "text", field: "cid", text: "leadsPage.cid", dispatch: "" },
      { searchType: "text", field: "utmSource", text: "leadsPage.utmSource", dispatch: "" },
      { searchType: "text", field: "utmMedium", text: "leadsPage.utmMedium", dispatch: "" },
      { searchType: "text", field: "utmCampaign", text: "leadsPage.utmCampaign", dispatch: "" },
      { searchType: "text", field: "utmTerm", text: "leadsPage.utmTerm", dispatch: "" },
      { searchType: "date", field: "createdAt", text: "leadsPage.createdAt", dispatch: "" },
      { searchType: "date", field: "updatedAt", text: "leadsPage.updatedAt", dispatch: "" },
    ],
    show: false,
    showData: {},
    choosenFilter: []
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
