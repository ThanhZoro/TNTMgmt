import api from '../_api';
import Vue from 'vue';
import utils from '@/utils/advanceFilter'

const getTeam = async (context, request) => {
  var query = await utils.initFilter([], { description: request, currentPage: 1, pageSize: 10, sort: { field: "createdAt", sortOrder: 1 } });
  let response = await api.getTeam(query);
  context.commit('SET_LIST_TEAM', response.data);
};

const showHideCols = async (context, request) => {
  context.commit('SHOW_HIDE_COLS', request);
};
const updateFilter = async (context, request) => {
  context.commit('UPDATE_CHOOSEN_FILTER', request);
};
const updateFilterCheckbox = async (context, request) => {
  switch (request.type) {
    case "teamIds":
      await context.dispatch('getTeam', request ? request.data : "" );
      break;
    default:
  }
  context.commit('UPDATE_FILTER_CHECKBOX', { data: request ? request.data : null });
};

export default {
  showHideCols,
  updateFilter,
  updateFilterCheckbox,
  getTeam
};
