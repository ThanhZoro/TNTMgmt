
const currentProductCategory = (state, getters, rootState) => {
  if (rootState.route.params.id) {
    return state.productCategory ? state.productCategory : null;
  } else {
    return {};
  }
};

export default {
  currentProductCategory
};
