import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  carposting: null,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: "desc" }
  },
  advanceFilter: {
    filters: [
      { searchType: "text", field: "Name", text: "Tên tracking", dispatch: "" },
      { searchType: "text", field: "WebsiteUrl", text: "Website", dispatch: "" },
      { searchType: "text", field: "WebPropertyId", text: "GA Tracking Code", dispatch: "" },
      { searchType: "date", field: "CreatedAt", text: "Ngày tạo", dispatch: "" },
      { searchType: "date", field: "UpdatedAt", text: "Ngày cập nhật", dispatch: "" },
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
