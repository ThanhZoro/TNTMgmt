import commonData from '@/utils/common-data'
import commonFunc from '@/utils/common-func'

const currentUser = (state, getters, rootState) => {
  let user = {};
  if (rootState.auth.userInfo) {
    // reset all common rules become false
    user = _.find(rootState.common.users, (v) => { return v.id == rootState.auth.userInfo.profile.sub });
    if (user && user.id != rootState.common.companyInfo.ownerId) {
      commonFunc.setCommonRules(commonData.accessRight, false);
      _.forEach(rootState.common.roles, (v) => {
        _.forEach(v.value, (o) => {
          var roles = _.find(user.roles, (t) => { return t == o.key });
          if (roles) {
            _.forEach(o.value, (m) => {
              var nested = m.split('_');
              if (nested[0]) {
                if (commonData.accessRight[nested[0].toLowerCase()]) {
                  var key = commonFunc.getKey(nested);
                  commonData.accessRight[nested[0].toLowerCase()][key.toLocaleLowerCase()] = true;
                }
              }
            });
          }
        });
      });
    } else {
      commonFunc.setCommonRules(commonData.accessRight, true);
    }
    user["accessRight"] = commonData.accessRight;
  }
  return user;
};

export default {
  currentUser
};
