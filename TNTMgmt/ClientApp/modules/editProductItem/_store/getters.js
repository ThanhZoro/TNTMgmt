
const currentProductItem = (state, getters, rootState) => {
  if (rootState.route.params.id) {
    return state.productItem ? state.productItem : null;
  } else {
    return {};
  }
};

export default {
  currentProductItem
};
