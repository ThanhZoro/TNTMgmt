import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: 1 }
  },
  headers: {
    trackingName: true,
    website: true,
    delete: true,
    createdOn: true,
    updatedOn: true,
  },
  allTracking: null,
  GAMapping: null,
  total : 0,
  advanceFilter: {
    filters: [
      { searchType: "text", field: "name", text: "Tên tracking", dispatch: "" },
      { searchType: "text", field: "websiteUrl", text: "Website", dispatch: "" },
      { searchType: "text", field: "webPropertyId", text: "GA Tracking Code", dispatch: "" },
      { searchType: "date", field: "createdAt", text: "Ngày tạo", dispatch: "" },
      { searchType: "date", field: "updatedAt", text: "Ngày cập nhật", dispatch: "" },
    ],
    show: false,
    showData: {},
    choosenFilter: [],
    pickerOptions: {
      shortcuts: [{
        text: 'Last week',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: 'Last month',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: 'Last 3 months',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit('pick', [start, end]);
        }
      }]
    },
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
