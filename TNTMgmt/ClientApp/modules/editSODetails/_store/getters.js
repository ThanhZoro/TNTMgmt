
const currentSODetail = (state, getters, rootState) => {
  if (rootState.route.params.id) {
    return state.soDetail ? state.soDetail : null;
  } else {
    return {};
  }
};

export default {
  currentSODetail
};
