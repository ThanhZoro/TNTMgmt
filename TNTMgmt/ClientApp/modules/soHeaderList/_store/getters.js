import Vue from 'vue'
import utils from '@/utils/advanceFilter'
import commonData from "@/utils/common-data"
import commonFunc from "@/utils/common-func"

const soHeaderList = (state, getters, rootState) => {
  var soHeaderList = {};
  if (state.soHeaderList) {
    var data = _.map(state.soHeaderList, function (v) {
      var users = _.find(rootState.common.users, function (o) { return o.id == v.salesman; });
      v.salesmanName = users.firstName;
      v.salesmanPhone = users.phoneNumber;
      v.salesmanAddress = users.address;
      v.salesmanEmail = users.email;

      var teamTemp = _.find(state.team, function (o) { return o.id == v.teamId; });
      if (teamTemp) {
        v.teamName = teamTemp.name;
      }
      var statusTemp = _.find(commonData.statusSOHeader, function (o) { return o.index == v.status; });
      if (statusTemp) {
        v.statusColor = statusTemp.colorValue;
      }

      if (v.discountType == 1) {
        v.totalAmount = v.subTotalAmount + (v.subTotalAmount * (v.vatAmount / 100)) - (v.subTotalAmount * (v.discount / 100));
      } else if (v.discountType == 3) {
        v.totalAmount = v.subTotalAmount + (v.subTotalAmount * (v.vatAmount / 100)) - (v.discount);
      } else if (v.discountType == 2) {
        var totalWithoutDiscount = v.subTotalAmount + (v.subTotalAmount * (v.vatAmount / 100));
        v.totalAmount = totalWithoutDiscount - (totalWithoutDiscount * (v.discount / 100));
      } else {
        var totalWithoutDiscount = v.subTotalAmount + (v.subTotalAmount * (v.vatAmount / 100));
        v.totalAmount = totalWithoutDiscount - v.discount;
      }

      v.noteContent = v.note ? commonFunc.shorten(v.note, 50) : '';
      v.soDateTime = v.soDate ? Vue.prototype.$moment.utc(v.soDate).format('DD/MM/YYYY') : v.soDate;
      v.fromNowCreate = Vue.prototype.$moment.utc(v.createdAt).fromNow();
      v.fromNowUpdate = Vue.prototype.$moment.utc(v.updatedAt).fromNow();
      return v;
    });
    soHeaderList.total = state.total;
    data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder == 1 ? 'desc' : 'asc']);
    soHeaderList.data = data;
  }
  return soHeaderList;
};

const filterData = (state, getters, rootState) => {
  if (state.advanceFilter && state.advanceFilter.showData) {
    var data = [];
    var valuePre = [];
    switch (state.advanceFilter.showData.field) {
      case "salesman":
        valuePre = _.filter(rootState.common.users, function (v) {
          return ((v.userName && v.userName.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1) ||
            (v.firstName && v.firstName.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1) ||
            (v.email && v.email.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1) ||
            (v.phoneNumber && v.phoneNumber.indexOf(state.searchRequestFilter.desFilter) > -1));
        });
        valuePre.forEach(function (value) {
          data.push({ id: value.id, name: value.firstName + ' | ' + value.userName });
        });
        break;
      case "status":
        valuePre = _.filter(commonData.statusSOHeader, function (o) {
          return o;
        });
        valuePre.forEach(function (value) {
          data.push({ id: value.index, name: value.index });
        });
        break;
      case "buyer":
        valuePre = _.filter(state.listLeadsInHeader, function (v) {
          if (state.searchRequestFilter.desFilter != '') {
            return ((v.fullName && v.fullName.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1) ||
              (v.phone && v.phone.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1) ||
              (v.address && v.address.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1) ||
              (v.email && v.email.toLowerCase().indexOf(state.searchRequestFilter.desFilter.toLowerCase()) > -1));
          } else {
            return v;
          }
        });
        valuePre.forEach(function (value) {
          data.push({ id: value.id, name: value.fullName + ' | ' + value.email });
        });
        break;
      default:
    }
    data = _.take(data, state.searchRequestFilter.size);
    return data;
  }
};

const remainFilters = (state, getters, rootState) => {
  return _.filter(state.advanceFilter.filters, (v) => {
    return !_.find(state.advanceFilter.choosenFilter, { field: v.field })
  })
};

const getCompany = (state, getters, rootState) => {
  return rootState.common.companyInfo;
};

export default {
  soHeaderList,
  filterData,
  remainFilters,
  getCompany
};
