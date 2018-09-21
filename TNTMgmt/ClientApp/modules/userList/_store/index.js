import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: "desc" }
  },
  searchRequestFilter: {
    desFilter: '',
    size: 5
  },
  team: null,
  headers: {
    fullName: true,
    status: false,
    gender: false,
    email: true,    
    phone: true,
    accessRight: true,
    birthday: false,
    userName: true,
    code: true,
    position: true,
    department: true,
    createdAt: false,
    updatedAt: false,
  },
  advanceFilter: {
    filters: [
      { searchType: "checkbox", field: "gender", text: "userList.gender", dispatch: "" },
      { searchType: "checkbox", field: "teamIds", text: "screen.team", dispatch: "" },
      { searchType: "text", field: "code", text: "userList.code", dispatch: "" },
      { searchType: "text", field: "position", text: "userList.position", dispatch: "" },
      { searchType: "text", field: "department", text: "userList.department", dispatch: "" },
      { searchType: "date", field: "createdAt", text: "userList.createdAt", dispatch: "" },
      { searchType: "date", field: "updatedAt", text: "userList.updatedAt", dispatch: "" },
    ],
    choosenFilter: [],
    show: false,
    showData: {},
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
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
