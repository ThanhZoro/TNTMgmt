import Vue from 'vue'

const SET_LIST_MESSAGES = (state, messages) => {
  state.listMessages = messages.data;
  state.maxSize = Math.ceil(messages.total / 10);
};

const UPDATE_LIST_MESSAGES = (state, messages) => {
  messages.createdAt = new Date().getTime();
  state.listMessages.push(messages);
};
const UPDATE_NUMBER_SCROLL = (state, messages) => {
  if (messages) {
    state.searchRequest.numberScroll = messages;
  } else {
    state.searchRequest.numberScroll++;
  }  
};
export default {
  SET_LIST_MESSAGES,
  UPDATE_LIST_MESSAGES,
  UPDATE_NUMBER_SCROLL
};
