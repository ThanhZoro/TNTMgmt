import Vue from 'vue'
import utils from '@/utils/advanceFilter'

const userData = (state, getters, rootState) => {
  var userData = { data: [], total: 0 };
  var data = [];
  data = _.filter(rootState.common.users, function (v) {
    v.fromNowCreate = Vue.prototype.$moment.utc(v.createdAt).fromNow();
    v.fromNowUpdate = Vue.prototype.$moment.utc(v.updatedAt).fromNow();
    v.birthdayTime = v.birthday ? Vue.prototype.$moment.utc(v.birthday).format('DD/MM/YYYY') : v.birthday;
    var genderTemp = _.find(rootState.common.commonDatas, (o) => { return o.id == v.gender });
    if (genderTemp) {
      v.gender = genderTemp.dataValue;
    }

    return ((v.userName && v.userName.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1) ||
      (v.fullName && v.fullName.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1) ||
      (v.email && v.email.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1) ||
      (v.phoneNumber && v.phoneNumber.indexOf(state.searchRequest.description) > -1));
  });
  data = utils.applyFilterUser(state.advanceFilter.choosenFilter, data);
  userData.total = data.length;
  //sort & take - skip
  data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder]);
  data = _.take(_.drop(data, (state.searchRequest.currentPage - 1) * state.searchRequest.pageSize), state.searchRequest.pageSize);
  userData.data = data;
  return userData;
};
const filterData = (state, getters, rootState) => {
  if (state.advanceFilter && state.advanceFilter.showData) {
    var data = [];
    var valuePre = [];
    switch (state.advanceFilter.showData.field) {
      case "gender":
        valuePre = _.filter(rootState.common.commonDatas, function (o) {
          return ((o.dataType == 7) && (!o.isDelete) &&
            (o.dataValue && o.dataValue.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1));
        });
        valuePre.forEach(function (value) {
          data.push({ id: value.id, name: value.dataValue });
        });
        break;
      case "teamIds":
        data = state.team;
        break;
      default:
    }
    return data;
  }
};

const remainFilters = (state, getters, rootState) => {
  return _.filter(state.advanceFilter.filters, (v) => {
    return !_.find(state.advanceFilter.choosenFilter, { field: v.field })
  })
};

export default {
  userData,
  filterData,
  remainFilters
};
