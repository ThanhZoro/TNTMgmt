import Vue from 'vue'
import utils from '@/utils/advanceFilter'
import commonData from "@/utils/common-data"

const teamData = (state, getters, rootState) => {
  var teamData = {};
  if (state.team) {
    var userNameOwner = rootState.auth.userInfo ? rootState.auth.userInfo.profile.userName : null;
    var data = _.map(state.team, (v) => {
      var countUser = 0;
      _.forEach(rootState.common.users, (o) => {
        var teamUser = _.indexOf(o.teamIds, v.id);
        if (teamUser > -1) countUser++;
      });
      v.countUser = countUser;
      v.fromNowCreate = Vue.prototype.$moment.utc(v.createdAt).fromNow();
      v.fromNowUpdate = Vue.prototype.$moment.utc(v.updatedAt).fromNow();
      return v;
    });
    data = _.filter(data, (o) => { return !o.isDelete });
    teamData.total = state.total;
    data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder == 1 ? 'desc' : 'asc']);
    teamData.data = data;
  }
  return teamData;
};

const filterData = (state, getters, rootState) => {
  if (state.advanceFilter && state.advanceFilter.showData) {
    var data = [];
    var valuePre = [];
    
    data = _.take(data, state.searchRequestFilter.size);
    return data;
  }
};

const remainFilters = (state, getters, rootState) => {
  return _.filter(state.advanceFilter.filters, (v) => {
    return !_.find(state.advanceFilter.choosenFilter, { field: v.field })
  })
};

export default {
  teamData,
  filterData,
  remainFilters
};
