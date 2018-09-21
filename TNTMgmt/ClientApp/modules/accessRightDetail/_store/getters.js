import Vue from 'vue'
import utils from '@/utils/advanceFilter'
const getDescriptionRoles = (state, getter, rootState) => {
  var data = {};
  var topRoles = rootState.common.roles[0].value[0].value;
  topRoles = _.uniq(topRoles);
  var roles = _.cloneDeep(rootState.common.roles);
  var dataRoles = [];
  _.forEach(roles, (o, i) => {
    var response = _.map(o.value, (v, j) => {
      var arrayRoles = [];
      _.map(topRoles, (t, k) => {
        if (_.indexOf(v.value, t) > -1) {
          arrayRoles.push(1);
        } else {
          arrayRoles.push(0);
        }
      });
      v.arrayRoles = arrayRoles;
      return v;
    });
    _.forEach(response, (role, i) => { dataRoles.push(role) });
  });
  dataRoles = _.filter(dataRoles, (o) => { return o.key.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1 });
  data.topRoles = topRoles;
  data.roles = dataRoles;
  return data;
}
export default {
  getDescriptionRoles
};

